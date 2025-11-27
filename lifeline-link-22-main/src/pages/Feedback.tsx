import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Star, 
  Heart, 
  Send,
  CheckCircle,
  AlertCircle,
  ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const Feedback = () => {
  const { toast } = useToast();
  const [feedbackForm, setFeedbackForm] = useState({
    category: "",
    rating: "",
    subject: "",
    message: "",
    contactEmail: "",
    allowContact: false,
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "donation-experience", label: "Donation Experience" },
    { value: "website-usability", label: "Website Usability" },
    { value: "blood-search", label: "Blood Search Feature" },
    { value: "notifications", label: "Notifications" },
    { value: "customer-service", label: "Customer Service" },
    { value: "suggestion", label: "Feature Suggestion" },
    { value: "complaint", label: "Complaint" },
    { value: "other", label: "Other" }
  ];

  const recentFeedback = [
    {
      id: 1,
      category: "Donation Experience",
      subject: "Great experience at Central Blood Bank",
      rating: 5,
      status: "reviewed",
      date: "2024-01-15"
    },
    {
      id: 2,
      category: "Website Usability",
      subject: "Mobile app suggestion",
      rating: 4,
      status: "in-progress",
      date: "2024-01-10"
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFeedbackForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it and get back to you soon.",
      });
      
      // Reset form
      setFeedbackForm({
        category: "",
        rating: "",
        subject: "",
        message: "",
        contactEmail: "",
        allowContact: false,
        anonymous: false
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-warning fill-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const getStatusColor = (status: string): "secondary" | "destructive" | "default" | "outline" => {
    switch (status) {
      case "reviewed": return "secondary";
      case "in-progress": return "secondary";
      case "pending": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "reviewed": return <CheckCircle className="h-3 w-3" />;
      case "in-progress": return <AlertCircle className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Share Your Feedback</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your feedback helps us improve BloodConnect and provide better service 
            to donors and healthcare providers. We value your input!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Submit Feedback</span>
                </CardTitle>
                <CardDescription>
                  Help us improve by sharing your experience and suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Feedback Category</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <Label>Overall Rating</Label>
                    <RadioGroup 
                      value={feedbackForm.rating}
                      onValueChange={(value) => handleInputChange("rating", value)}
                      className="flex space-x-4"
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                            <span>{rating}</span>
                            <Star className={`h-4 w-4 ${
                              parseInt(feedbackForm.rating) >= rating ? "text-warning fill-warning" : "text-muted-foreground"
                            }`} />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your feedback"
                      value={feedbackForm.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Feedback</Label>
                    <Textarea
                      id="message"
                      placeholder="Please share your detailed feedback, suggestions, or concerns..."
                      value={feedbackForm.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowContact"
                        checked={feedbackForm.allowContact}
                        onCheckedChange={(checked) => handleInputChange("allowContact", checked)}
                      />
                      <Label htmlFor="allowContact" className="text-sm">
                        Allow us to contact you about this feedback
                      </Label>
                    </div>

                    {feedbackForm.allowContact && (
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="your.email@example.com"
                          value={feedbackForm.contactEmail}
                          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={feedbackForm.anonymous}
                        onCheckedChange={(checked) => handleInputChange("anonymous", checked)}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Submit this feedback anonymously
                      </Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full btn-hero" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Feedback Stats */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ThumbsUp className="h-5 w-5 text-primary" />
                  <span>Community Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-success">1,247</div>
                  <div className="text-sm text-muted-foreground">Feedback Received</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-warning">156</div>
                  <div className="text-sm text-muted-foreground">Features Improved</div>
                </div>
              </CardContent>
            </Card>

            {/* Your Recent Feedback */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Your Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentFeedback.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No feedback submitted yet
                  </p>
                ) : (
                  recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{feedback.subject}</p>
                          <p className="text-xs text-muted-foreground">{feedback.category}</p>
                        </div>
                        <Badge variant={getStatusColor(feedback.status)} className="text-xs">
                          {getStatusIcon(feedback.status)}
                          <span className="ml-1 capitalize">{feedback.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {renderStars(feedback.rating)}
                        </div>
                        <span className="text-xs text-muted-foreground">{feedback.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    For urgent issues or immediate assistance:
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Support Hotline:</p>
                    <p className="text-sm text-primary">+1 (555) 123-4567</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email Support:</p>
                    <p className="text-sm text-primary">support@bloodconnect.com</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>

            {/* Feedback Guidelines */}
            <Card className="medical-card bg-accent/20">
              <CardHeader>
                <CardTitle className="text-sm">Feedback Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Be specific and constructive</li>
                  <li>• Include relevant details</li>
                  <li>• Stay respectful and professional</li>
                  <li>• Suggest improvements when possible</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Feedback;