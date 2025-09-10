import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Droplets, 
  BarChart3, 
  Shield, 
  Users, 
  MapPin, 
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Gauge,
  Building2,
  Globe,
  Mail,
  Phone
} from "lucide-react";

const Index = () => {
  const pollutionLevels = [
    { level: "Safe", description: "HMPI < 30", color: "safe", icon: CheckCircle },
    { level: "Moderate", description: "HMPI 30-60", color: "moderate", icon: Gauge },
    { level: "Critical", description: "HMPI 60-100", color: "critical", icon: AlertTriangle },
    { level: "Unsafe", description: "HMPI > 100", color: "unsafe", icon: XCircle },
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Automated HMPI Calculation",
      description: "Advanced algorithms compute Heavy Metal Pollution Index with scientific precision, eliminating manual errors."
    },
    {
      icon: MapPin,
      title: "GIS Mapping Integration",
      description: "Interactive geographical visualization of contamination hotspots with real-time data overlay."
    },
    {
      icon: Shield,
      title: "Role-based Access Control",
      description: "Secure data management ensuring sensitive research data is accessible only to authorized personnel."
    },
    {
      icon: FileText,
      title: "Comprehensive Reporting",
      description: "Generate detailed PDF and Excel reports for government submissions and scientific publications."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-water rounded-lg flex items-center justify-center">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">HMPI Assessment</h1>
                <p className="text-sm text-muted-foreground">Ministry of Jal Shakti</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Methodology</Button>
              <Button variant="outline">Public View</Button>
              <Button variant="default">Researcher Login</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              Ministry of Jal Shakti Initiative
            </Badge>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Heavy Metal Pollution Index Assessment Platform
            </h1>
            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              AI-powered groundwater quality assessment for scientists, researchers, and policymakers. 
              Ensuring water safety through advanced scientific analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="text-lg">
                <Users className="mr-2 h-5 w-5" />
                Access Dashboard
              </Button>
              <Button variant="outline" size="lg" className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Globe className="mr-2 h-5 w-5" />
                View Public Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pollution Levels Overview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">HMPI Classification System</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our standardized Heavy Metal Pollution Index provides clear categorization of groundwater contamination levels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pollutionLevels.map((level, index) => {
              const Icon = level.icon;
              return (
                <Card key={index} className={`text-center border-2 border-${level.color}/20 hover:border-${level.color}/40 transition-colors`}>
                  <CardHeader className="pb-3">
                    <div className={`mx-auto h-12 w-12 rounded-full bg-${level.color}/10 flex items-center justify-center mb-3`}>
                      <Icon className={`h-6 w-6 text-${level.color}`} />
                    </div>
                    <CardTitle className={`text-${level.color}`}>{level.level}</CardTitle>
                    <CardDescription className="font-mono text-sm">{level.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools for accurate assessment and management of groundwater heavy metal contamination
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-card transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-gradient-water flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Scientific Methodology</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Data Collection & Validation</h3>
                    <p className="text-muted-foreground">Upload geo-referenced groundwater samples with heavy metal concentration data following ISO standards.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">HMPI Computation</h3>
                    <p className="text-muted-foreground">Automated calculation using standardized formulas considering WHO guidelines and regional standards.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Spatial Analysis</h3>
                    <p className="text-muted-foreground">GIS-based visualization and hotspot identification using advanced interpolation techniques.</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="shadow-water">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Government Partnership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-water rounded-lg text-white">
                  <div>
                    <p className="font-semibold">Ministry of Jal Shakti</p>
                    <p className="text-sm text-white/80">Government of India</p>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">Official Partner</Badge>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This platform is developed in collaboration with the Ministry of Jal Shakti to support national water quality assessment initiatives.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-safe" />
                    <span>ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-safe" />
                    <span>WHO Guidelines Compliant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Involved</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join our mission to ensure water safety through scientific excellence and data-driven insights
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-earth mx-auto flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Researchers & Scientists</CardTitle>
                <CardDescription>Access advanced tools for groundwater quality assessment</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full">Request Access</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-water mx-auto flex items-center justify-center mb-3">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Government Agencies</CardTitle>
                <CardDescription>Collaborate on policy development and implementation</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full">Partnership Inquiry</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-earth mx-auto flex items-center justify-center mb-3">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Public Access</CardTitle>
                <CardDescription>View water quality information in your area</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="secondary" className="w-full">View Public Map</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-water rounded-lg flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">HMPI Assessment</h3>
                  <p className="text-sm text-muted-foreground">Ministry of Jal Shakti</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Advancing water safety through scientific research and data-driven assessment of heavy metal pollution in groundwater systems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>research@hmpi.gov.in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+91-11-XXXX-XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Ministry of Jal Shakti, New Delhi</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Scientific Methodology</div>
                <div>Data Privacy Policy</div>
                <div>Terms of Use</div>
                <div>API Documentation</div>
                <div>Technical Support</div>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Ministry of Jal Shakti. All rights reserved. | Developed for scientific research and public welfare.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;