-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  organization TEXT,
  role TEXT CHECK (role IN ('scientist', 'researcher', 'government_officer', 'environmental_officer')),
  contact_email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create water test records table
CREATE TABLE public.water_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_name TEXT NOT NULL,
  location_name TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  collection_date DATE NOT NULL,
  testing_date DATE NOT NULL,
  
  -- Heavy metal concentrations (mg/L)
  arsenic DECIMAL(10, 6),
  cadmium DECIMAL(10, 6),
  chromium DECIMAL(10, 6),
  copper DECIMAL(10, 6),
  lead DECIMAL(10, 6),
  mercury DECIMAL(10, 6),
  nickel DECIMAL(10, 6),
  zinc DECIMAL(10, 6),
  iron DECIMAL(10, 6),
  manganese DECIMAL(10, 6),
  
  -- Calculated HMPI values
  hmpi_score DECIMAL(10, 4),
  pollution_level TEXT CHECK (pollution_level IN ('safe', 'moderate', 'critical', 'unsafe')),
  
  -- Additional metadata
  ph_level DECIMAL(4, 2),
  temperature DECIMAL(5, 2),
  dissolved_oxygen DECIMAL(6, 3),
  turbidity DECIMAL(8, 3),
  electrical_conductivity DECIMAL(10, 3),
  
  -- Status and notes
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzed', 'verified', 'published')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create HMPI standards reference table
CREATE TABLE public.hmpi_standards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_name TEXT NOT NULL UNIQUE,
  who_standard DECIMAL(10, 6) NOT NULL,
  bis_standard DECIMAL(10, 6) NOT NULL,
  weight_factor DECIMAL(4, 2) NOT NULL DEFAULT 1.0,
  unit TEXT DEFAULT 'mg/L',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert standard values for HMPI calculation
INSERT INTO public.hmpi_standards (metal_name, who_standard, bis_standard, weight_factor) VALUES
('arsenic', 0.01, 0.01, 6.0),
('cadmium', 0.003, 0.003, 5.0),
('chromium', 0.05, 0.05, 4.0),
('copper', 2.0, 0.05, 3.0),
('lead', 0.01, 0.01, 6.0),
('mercury', 0.006, 0.001, 6.0),
('nickel', 0.07, 0.02, 4.0),
('zinc', 3.0, 5.0, 2.0),
('iron', 0.3, 0.3, 3.0),
('manganese', 0.4, 0.1, 3.0);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hmpi_standards ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for water tests
CREATE POLICY "Users can view their own water tests" ON public.water_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own water tests" ON public.water_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own water tests" ON public.water_tests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own water tests" ON public.water_tests
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for HMPI standards (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view HMPI standards" ON public.hmpi_standards
  FOR SELECT TO authenticated USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_water_tests_updated_at
  BEFORE UPDATE ON public.water_tests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, contact_email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to calculate HMPI score
CREATE OR REPLACE FUNCTION public.calculate_hmpi_score(
  p_arsenic DECIMAL DEFAULT NULL,
  p_cadmium DECIMAL DEFAULT NULL,
  p_chromium DECIMAL DEFAULT NULL,
  p_copper DECIMAL DEFAULT NULL,
  p_lead DECIMAL DEFAULT NULL,
  p_mercury DECIMAL DEFAULT NULL,
  p_nickel DECIMAL DEFAULT NULL,
  p_zinc DECIMAL DEFAULT NULL,
  p_iron DECIMAL DEFAULT NULL,
  p_manganese DECIMAL DEFAULT NULL
)
RETURNS DECIMAL AS $$
DECLARE
  total_score DECIMAL := 0;
  metal_count INTEGER := 0;
  standards RECORD;
BEGIN
  -- Calculate for each metal if value is provided
  FOR standards IN SELECT * FROM public.hmpi_standards LOOP
    IF standards.metal_name = 'arsenic' AND p_arsenic IS NOT NULL THEN
      total_score := total_score + (p_arsenic / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'cadmium' AND p_cadmium IS NOT NULL THEN
      total_score := total_score + (p_cadmium / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'chromium' AND p_chromium IS NOT NULL THEN
      total_score := total_score + (p_chromium / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'copper' AND p_copper IS NOT NULL THEN
      total_score := total_score + (p_copper / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'lead' AND p_lead IS NOT NULL THEN
      total_score := total_score + (p_lead / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'mercury' AND p_mercury IS NOT NULL THEN
      total_score := total_score + (p_mercury / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'nickel' AND p_nickel IS NOT NULL THEN
      total_score := total_score + (p_nickel / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'zinc' AND p_zinc IS NOT NULL THEN
      total_score := total_score + (p_zinc / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'iron' AND p_iron IS NOT NULL THEN
      total_score := total_score + (p_iron / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    ELSIF standards.metal_name = 'manganese' AND p_manganese IS NOT NULL THEN
      total_score := total_score + (p_manganese / standards.who_standard) * standards.weight_factor;
      metal_count := metal_count + 1;
    END IF;
  END LOOP;
  
  -- Return average if metals were tested
  IF metal_count > 0 THEN
    RETURN total_score / metal_count;
  ELSE
    RETURN 0;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;