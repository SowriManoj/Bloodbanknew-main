import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  Bell,
  Plus,
  Activity,
  Clock
} from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const userProfile = {
    name: "John Doe",
    bloodType: "O+",
    donations: 12,
    lastDonation: "2024-01-15",
    nextEligible: "2024-03-15",
    points: 1200,
  };

  const recentActivity = [
    {
      id: 1,
      type: "donation",
      title: "Blood Donation",
      description: "Donated at City Hospital",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      type: "request",
      title: "Emergency Request Matched",
      description: "Your blood type matched an emergency request",
      date: "2024-01-10",
      status: "matched"
    },
    {
      id: 3,
      type: "achievement",
      title: "10 Donations Milestone",
      description: "Congratulations on reaching 10 donations!",
      date: "2024-01-01",
      status: "achievement"
    }
  ];

  const nearbyRequests = [
    {
      id: 1,
      bloodType: "O+",
      urgency: "Critical",
      hospital: "Central Medical Center",
      distance: "2.3 km",
      time: "2 hours ago"
    },
    {
      id: 2,
      bloodType: "O-",
      urgency: "Urgent",
      hospital: "St. Mary's Hospital",
      distance: "5.1 km",
      time: "4 hours ago"
    }
  ];

  const stats = [
    {
      title: "Total Donations",
      value: userProfile.donations,
      icon: Heart,
      color: "text-primary"
    },
    {
      title: "Lives Saved",
      value: userProfile.donations * 3,
      icon: Users,
      color: "text-success"
    },
    {
      title: "Reward Points",
      value: userProfile.points,
      icon: Award,
      color: "text-warning"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "destructive";
      case "Urgent": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Thank you for being a life-saver. Here's your dashboard overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donation Status */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Donation Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <Badge variant="secondary" className="text-lg">
                      {userProfile.bloodType}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last Donation</p>
                    <p className="font-medium">{userProfile.lastDonation}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Next Eligible Date</p>
                    <p className="text-sm font-medium">{userProfile.nextEligible}</p>
                  </div>
                  <Progress value={70} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    You can donate again in 28 days
                  </p>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Link to="/schedule-donation">
                    <Button className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Donation
                    </Button>
                  </Link>
                  <Link to="/emergency-response">
                    <Button variant="outline" className="flex-1">
                      <Bell className="h-4 w-4 mr-2" />
                      Emergency Response
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0">
                      {activity.type === "donation" && <Heart className="h-5 w-5 text-primary" />}
                      {activity.type === "request" && <Bell className="h-5 w-5 text-warning" />}
                      {activity.type === "achievement" && <Award className="h-5 w-5 text-success" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/find-blood">
                  <Button className="w-full justify-start" variant="outline">
                    <MapPin className="h-4 w-4 mr-2" />
                    Find Blood Banks
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Update Profile
                  </Button>
                </Link>
                <Link to="/feedback">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Give Feedback
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Nearby Blood Requests */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Nearby Requests</span>
                </CardTitle>
                <CardDescription>
                  Help save lives in your area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyRequests.map((request) => (
                  <div key={request.id} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{request.bloodType}</Badge>
                      <Badge variant={getUrgencyColor(request.urgency)}>
                        {request.urgency}
                      </Badge>
                    </div>
                    <p className="font-medium text-sm">{request.hospital}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{request.distance}</span>
                      <span>{request.time}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      Respond to Request
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;