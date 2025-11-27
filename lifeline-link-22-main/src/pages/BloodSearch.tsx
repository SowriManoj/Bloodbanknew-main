import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Droplet,
  Filter,
  Navigation,
  Heart
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const BloodSearch = () => {
  const [searchForm, setSearchForm] = useState({
    bloodType: "",
    location: "",
    radius: "10",
    urgency: ""
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = ["Critical", "Urgent", "Normal"];

  const bloodBanks = [
    {
      id: 1,
      name: "Central Blood Bank",
      address: "123 Medical Center Dr, Downtown",
      phone: "+1 (555) 123-4567",
      distance: "1.2 km",
      openHours: "24/7",
      bloodTypes: ["A+", "A-", "B+", "O+", "O-"],
      availability: {
        "A+": 15,
        "A-": 8,
        "B+": 12,
        "O+": 25,
        "O-": 10
      },
      rating: 4.8,
      verified: true
    },
    {
      id: 2,
      name: "St. Mary's Hospital Blood Center",
      address: "456 Healthcare Ave, Midtown",
      phone: "+1 (555) 234-5678",
      distance: "2.8 km",
      openHours: "6:00 AM - 10:00 PM",
      bloodTypes: ["A+", "B+", "B-", "AB+", "O+"],
      availability: {
        "A+": 8,
        "B+": 6,
        "B-": 4,
        "AB+": 3,
        "O+": 18
      },
      rating: 4.6,
      verified: true
    },
    {
      id: 3,
      name: "Regional Medical Blood Bank",
      address: "789 Emergency Blvd, Uptown",
      phone: "+1 (555) 345-6789",
      distance: "4.5 km",
      openHours: "24/7",
      bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      availability: {
        "A+": 20,
        "A-": 12,
        "B+": 15,
        "B-": 8,
        "AB+": 5,
        "AB-": 3,
        "O+": 30,
        "O-": 15
      },
      rating: 4.9,
      verified: true
    }
  ];

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      address: "321 Emergency St, Downtown",
      phone: "+1 (555) 987-6543",
      distance: "0.8 km",
      emergency: true,
      bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-"],
      currentNeeds: ["O-", "AB-", "B-"]
    },
    {
      id: 2,
      name: "Metropolitan Medical Center",
      address: "654 Health Plaza, Central",
      phone: "+1 (555) 876-5432",
      distance: "3.2 km",
      emergency: true,
      bloodTypes: ["A+", "B+", "AB+", "O+"],
      currentNeeds: ["O+", "A+"]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Filter results based on search criteria
    console.log("Searching with:", searchForm);
  };

  const getAvailabilityColor = (count: number) => {
    if (count >= 15) return "text-success";
    if (count >= 5) return "text-warning";
    return "text-destructive";
  };

  const getAvailabilityBadge = (count: number) => {
    if (count >= 15) return "secondary";
    if (count >= 5) return "secondary";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Blood</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Locate blood banks, hospitals, and check blood availability in your area.
            Search by blood type, location, and urgency level.
          </p>
        </div>

        {/* Search Form */}
        <Card className="medical-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Search Filters</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select onValueChange={(value) => handleInputChange("bloodType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center space-x-2">
                          <Droplet className="h-4 w-4 text-primary" />
                          <span>{type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter city or ZIP code"
                  value={searchForm.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="radius">Search Radius</Label>
                <Select onValueChange={(value) => handleInputChange("radius", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="10 km" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="25">25 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="100">100 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search Blood Banks
              </Button>
              <Button variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                Use My Location
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blood Banks Results */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Droplet className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Blood Banks</h2>
              <Badge variant="secondary">{bloodBanks.length} found</Badge>
            </div>

            {bloodBanks.map((bank) => (
              <Card key={bank.id} className="medical-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{bank.name}</span>
                        {bank.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{bank.distance}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{bank.openHours}</span>
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm">
                        <span>★</span>
                        <span>{bank.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{bank.address}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Blood Availability</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(bank.availability).map(([type, count]) => (
                        <div key={type} className="text-center p-2 border rounded">
                          <div className="font-medium text-sm">{type}</div>
                          <div className={`text-lg font-bold ${getAvailabilityColor(count)}`}>
                            {count}
                          </div>
                          <Badge 
                            variant={getAvailabilityBadge(count)} 
                            className="text-xs"
                          >
                            {count >= 15 ? "High" : count >= 5 ? "Low" : "Critical"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Hospitals Results */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Hospitals</h2>
              <Badge variant="secondary">{hospitals.length} found</Badge>
            </div>

            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>{hospital.name}</span>
                    {hospital.emergency && (
                      <Badge variant="destructive" className="text-xs">
                        Emergency
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hospital.distance}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{hospital.address}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Current Blood Needs</h4>
                    <div className="flex flex-wrap gap-2">
                      {hospital.currentNeeds.map((type) => (
                        <Badge key={type} variant="destructive">
                          {type} - Urgent
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Accepted Blood Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {hospital.bloodTypes.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Hospital
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" />
                      Emergency Donation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Emergency Contact Card */}
            <Card className="medical-card border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Emergency Blood Request</CardTitle>
                <CardDescription>
                  Can't find the blood type you need? Submit an emergency request.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="destructive">
                  Submit Emergency Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BloodSearch;