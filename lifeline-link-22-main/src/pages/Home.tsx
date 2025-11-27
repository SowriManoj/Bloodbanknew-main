import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MapPin, Clock, Shield, Award, Phone, Droplets } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: "Save Lives",
      description: "Your blood donation can save up to 3 lives. Make a difference today."
    },
    {
      icon: Users,
      title: "Connect Donors",
      description: "Connect with hospitals and blood banks in your area instantly."
    },
    {
      icon: MapPin,
      title: "Find Nearby",
      description: "Locate blood banks and donation centers near your location."
    },
    {
      icon: Clock,
      title: "24/7 Emergency",
      description: "Round-the-clock emergency blood request and response system."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "All donations are tested and stored following medical protocols."
    },
    {
      icon: Award,
      title: "Certified",
      description: "Working with certified hospitals and licensed blood banks only."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Lives Saved", icon: Heart },
    { number: "5,000+", label: "Active Donors", icon: Users },
    { number: "200+", label: "Partner Hospitals", icon: MapPin },
    { number: "24/7", label: "Emergency Support", icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="container px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Droplets className="h-4 w-4" />
                <span>Connecting Donors, Saving Lives</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Blood Can
                <span className="text-primary block">Save Lives</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Join our blood banking network that connects donors with hospitals and blood banks 
                for efficient resource management and emergency response.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="btn-hero text-lg px-8 py-4 h-auto">
                    Become a Donor
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                    Find Blood Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="medical-card rounded-2xl p-8 text-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full mx-auto">
                  <Heart className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">Emergency Blood Request</h3>
                <p className="text-muted-foreground">
                  Need blood urgently? Submit your request and get matched with donors instantly.
                </p>
                <Link to="/emergency">
                  <Button className="w-full" size="lg">
                    Emergency Request
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="h-8 w-8 text-primary mx-auto" />
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose BloodConnect?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide a comprehensive platform that makes blood donation and requests simple, 
              safe, and efficient for everyone involved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="medical-card border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of donors who are already saving lives. Sign up today and become 
              part of our life-saving community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 h-auto">
                  Register as Donor
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 h-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;