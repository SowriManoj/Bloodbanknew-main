import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Hospital, 
  Droplets, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Heart
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dashboardStats = [
    {
      title: "Total Donors",
      value: "12,847",
      change: "+5.2%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Partner Hospitals",
      value: "156",
      change: "+2.1%",
      icon: Hospital,
      color: "text-success"
    },
    {
      title: "Blood Units Available",
      value: "2,341",
      change: "-1.5%",
      icon: Droplets,
      color: "text-warning"
    },
    {
      title: "Critical Requests",
      value: "23",
      change: "+12.3%",
      icon: AlertTriangle,
      color: "text-destructive"
    }
  ];

  const recentDonors = [
    {
      id: 1,
      name: "John Smith",
      bloodType: "O+",
      lastDonation: "2024-01-15",
      status: "eligible",
      donationCount: 8,
      location: "New York, NY"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      bloodType: "A-",
      lastDonation: "2024-01-10",
      status: "not-eligible",
      donationCount: 15,
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      name: "Mike Davis",
      bloodType: "B+",
      lastDonation: "2023-12-20",
      status: "eligible",
      donationCount: 3,
      location: "Chicago, IL"
    }
  ];

  const bloodInventory = [
    { type: "A+", available: 145, required: 120, status: "good" },
    { type: "A-", available: 67, required: 80, status: "low" },
    { type: "B+", available: 98, required: 90, status: "good" },
    { type: "B-", available: 34, required: 50, status: "critical" },
    { type: "AB+", available: 28, required: 30, status: "low" },
    { type: "AB-", available: 12, required: 20, status: "critical" },
    { type: "O+", available: 210, required: 200, status: "good" },
    { type: "O-", available: 45, required: 80, status: "low" }
  ];

  const hospitals = [
    {
      id: 1,
      name: "Central Medical Center",
      address: "123 Healthcare Ave, Downtown",
      status: "active",
      lastRequest: "2024-01-16",
      totalRequests: 45,
      bloodTypes: ["O+", "A+", "B+"]
    },
    {
      id: 2,
      name: "St. Mary's Hospital",
      address: "456 Medical St, Uptown",
      status: "active",
      lastRequest: "2024-01-15",
      totalRequests: 32,
      bloodTypes: ["O-", "AB+", "A-"]
    }
  ];

  const emergencyRequests = [
    {
      id: 1,
      hospital: "Emergency General",
      bloodType: "O-",
      units: 5,
      urgency: "critical",
      timeLeft: "2 hours",
      location: "Downtown"
    },
    {
      id: 2,
      hospital: "City Medical",
      bloodType: "A+",
      units: 3,
      urgency: "urgent",
      timeLeft: "6 hours",
      location: "Midtown"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-success";
      case "low": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string): "secondary" | "destructive" | "default" | "outline" => {
    switch (status) {
      case "good": return "secondary";
      case "low": return "secondary";
      case "critical": return "destructive";
      case "active": return "secondary";
      case "eligible": return "secondary";
      case "not-eligible": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage blood inventory, donors, hospitals, and emergency requests
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Hospital
            </Button>
            <Button variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="medical-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                      {stat.change}
                    </span>
                    {" "}from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="inventory">Blood Inventory</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Requests</TabsTrigger>
          </TabsList>

          {/* Blood Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-primary" />
                  <span>Blood Inventory Status</span>
                </CardTitle>
                <CardDescription>
                  Current blood stock levels across all blood banks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bloodInventory.map((blood) => (
                    <div key={blood.type} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-lg">
                          {blood.type}
                        </Badge>
                        <Badge variant={getStatusBadge(blood.status)}>
                          {blood.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Available:</span>
                          <span className={`font-medium ${getStatusColor(blood.status)}`}>
                            {blood.available}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Required:</span>
                          <span>{blood.required}</span>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        <Edit className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donors Tab */}
          <TabsContent value="donors" className="space-y-6">
            <Card className="medical-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Registered Donors</span>
                  </CardTitle>
                  <CardDescription>
                    Manage and monitor donor information
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search donors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDonors.map((donor) => (
                    <div key={donor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{donor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {donor.location} • {donor.donationCount} donations
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">{donor.bloodType}</Badge>
                        <Badge variant={getStatusBadge(donor.status)}>
                          {donor.status === "eligible" ? "Eligible" : "Not Eligible"}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          Last: {donor.lastDonation}
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hospitals Tab */}
          <TabsContent value="hospitals" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Hospital className="h-5 w-5 text-primary" />
                  <span>Partner Hospitals</span>
                </CardTitle>
                <CardDescription>
                  Monitor hospital partnerships and blood requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitals.map((hospital) => (
                    <div key={hospital.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{hospital.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{hospital.address}</span>
                          </p>
                        </div>
                        <Badge variant={getStatusBadge(hospital.status)}>
                          {hospital.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Requests:</span>
                          <span className="font-medium ml-2">{hospital.totalRequests}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Request:</span>
                          <span className="font-medium ml-2">{hospital.lastRequest}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Blood Types:</span>
                          <div className="flex space-x-1 mt-1">
                            {hospital.bloodTypes.map((type) => (
                              <Badge key={type} variant="outline" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Requests Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="medical-card border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Emergency Blood Requests</span>
                </CardTitle>
                <CardDescription>
                  Critical and urgent blood requests requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-destructive/30 rounded-lg bg-background">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-destructive">{request.hospital}</h4>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{request.location}</span>
                          </p>
                        </div>
                        <Badge variant="destructive">
                          {request.urgency}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Blood Type:</span>
                          <Badge variant="secondary" className="ml-2">
                            {request.bloodType}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Units Needed:</span>
                          <span className="font-medium ml-2">{request.units}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-destructive mr-1" />
                          <span className="text-destructive font-medium">{request.timeLeft} left</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="destructive">
                          Fulfill Request
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Hospital
                        </Button>
                        <Button size="sm" variant="outline">
                          Find Donors
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;