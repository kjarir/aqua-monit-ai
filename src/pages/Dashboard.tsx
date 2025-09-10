import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Plus, FileText, Map, BarChart3, Settings, LogOut, User } from "lucide-react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [waterTests, setWaterTests] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchWaterTests();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWaterTests = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('water_tests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setWaterTests(data || []);
    } catch (error: any) {
      console.error('Error fetching water tests:', error);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
    }
  };

  const getPollutionLevelColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-safe text-safe-foreground';
      case 'moderate': return 'bg-moderate text-moderate-foreground';
      case 'critical': return 'bg-critical text-critical-foreground';
      case 'unsafe': return 'bg-unsafe text-unsafe-foreground';
      default: return 'bg-secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <Droplets className="h-8 w-8 animate-pulse text-primary mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Droplets className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">HMPI Dashboard</h1>
                <p className="text-sm text-muted-foreground">Heavy Metal Pollution Index Assessment</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">{profile?.full_name || user?.email}</p>
                <p className="text-xs text-muted-foreground">{profile?.role || 'User'}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{waterTests.length}</div>
              <p className="text-xs text-muted-foreground">Water quality assessments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safe Locations</CardTitle>
              <Droplets className="h-4 w-4 text-safe" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-safe">
                {waterTests.filter(test => test.pollution_level === 'safe').length}
              </div>
              <p className="text-xs text-muted-foreground">Below pollution threshold</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Areas</CardTitle>
              <Droplets className="h-4 w-4 text-critical" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-critical">
                {waterTests.filter(test => test.pollution_level === 'critical' || test.pollution_level === 'unsafe').length}
              </div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg HMPI Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {waterTests.length > 0 
                  ? (waterTests.reduce((sum, test) => sum + (test.hmpi_score || 0), 0) / waterTests.length).toFixed(2)
                  : '0.00'
                }
              </div>
              <p className="text-xs text-muted-foreground">Overall pollution index</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" 
                onClick={() => navigate("/test/new")}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2 text-primary" />
                New Water Test
              </CardTitle>
              <CardDescription>
                Upload new groundwater heavy metal concentration data
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate("/map")}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-primary" />
                Interactive Map
              </CardTitle>
              <CardDescription>
                View pollution hotspots and geographical distribution
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate("/reports")}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Generate Reports
              </CardTitle>
              <CardDescription>
                Create PDF/Excel reports for government submissions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Water Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Water Tests</CardTitle>
            <CardDescription>
              Your latest groundwater heavy metal assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {waterTests.length === 0 ? (
              <div className="text-center py-8">
                <Droplets className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No water tests yet</p>
                <Button onClick={() => navigate("/test/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Test
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {waterTests.slice(0, 5).map((test) => (
                  <div key={test.id} 
                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                       onClick={() => navigate(`/test/${test.id}`)}>
                    <div className="flex-1">
                      <h4 className="font-medium">{test.test_name}</h4>
                      <p className="text-sm text-muted-foreground">{test.location_name}</p>
                      <p className="text-xs text-muted-foreground">
                        Tested: {new Date(test.testing_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getPollutionLevelColor(test.pollution_level)}>
                        {test.pollution_level || 'Pending'}
                      </Badge>
                      {test.hmpi_score && (
                        <p className="text-sm font-mono">HMPI: {test.hmpi_score}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {waterTests.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={() => navigate("/tests")}>
                      View All Tests ({waterTests.length})
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;