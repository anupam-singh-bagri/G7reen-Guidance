
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, IndianRupee, Users, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    mobile: "",
  });

  const featuredStudents = [
    {
      name: "Anupam Singh Bagri",
      institute: "IIT Dhanbad",
      specialization: "Computer Science",
      year: "4th Year",
    },
    {
      name: "NandKishore Pandit",
      institute: "IIT Gandhinagar",
      specialization: "Electrical Engineering",
      year: "3rd Year",
    },
    {
      name: "Partap Kumar",
      institute: "IIT Roorkee",
      specialization: "Petroleum Engineering",
      year: "3rd Year",
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.mobile) {
      toast.error("Please fill in all fields");
      return;
    }
    if (contactForm.mobile.length !== 10 || !/^\d+$/.test(contactForm.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    
    // Instead of showing payment, now show confirmation
    setShowPayment(false);
    setShowConfirmation(true);
    
    // Send email with form data
    sendContactDataEmail(contactForm);
  };

  const sendContactDataEmail = async (data: { name: string; mobile: string }) => {
    try {
      // In a real implementation, you would call an API endpoint here
      // that would send an email. For demonstration purposes, we'll
      // just log to console and show a success message.
      console.log("Sending data to bagrianupamsingh7@gmail.com:", data);
      
      // In a production environment, you would implement a server-side
      // endpoint to handle this securely, for example:
      // await fetch('/api/send-email', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     to: 'bagrianupamsingh7@gmail.com',
      //     subject: 'New Mentorship Inquiry',
      //     text: `Name: ${data.name}\nMobile: ${data.mobile}`
      //   })
      // });
      
      toast.success("Your information has been sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("There was an error sending your information. Please try again.");
    }
  };

  const handleStudentClick = (studentName: string) => {
    setSelectedStudent(studentName);
    setShowPayment(false);
    setShowConfirmation(false);
    setContactForm({ name: "", mobile: "" });
  };

  const handleGetStartedClick = () => {
    setSelectedStudent("an IIT mentor");
    setShowPayment(false);
    setShowConfirmation(false);
    setContactForm({ name: "", mobile: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block animate-float">
              <GraduationCap className="w-16 h-16 text-primary mb-6" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Connect with IIT Students
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Get personalized guidance from current IIT students who recently cracked JEE
            </p>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary hover:bg-primary/90 transform transition-all duration-200"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleGetStartedClick}
            >
              <span className="relative z-10 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                <span>Start for just ₹19</span>
              </span>
              <div
                className={`absolute inset-0 bg-white/10 transform transition-transform duration-200 ${
                  isHovered ? "translate-x-0" : "-translate-x-full"
                }`}
              />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Students Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Featured Students</h2>
            <p className="text-muted-foreground">
              Learn from current students at India's premier institutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStudents.map((student) => (
              <Card
                key={student.name}
                className="p-6 hover:shadow-lg transition-shadow duration-200 bg-background cursor-pointer"
                onClick={() => handleStudentClick(student.name)}
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
                  <p className="text-primary font-medium mb-1">{student.institute}</p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {student.specialization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.year}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={selectedStudent !== null} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect with {selectedStudent}</DialogTitle>
            <DialogDescription>
              {!showPayment && !showConfirmation 
                ? "Please enter your details to connect" 
                : showPayment 
                  ? "Complete your payment to start mentorship"
                  : "Thank you for your interest"}
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {!showPayment && !showConfirmation ? (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Mobile Number"
                  type="tel"
                  value={contactForm.mobile}
                  onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                  maxLength={10}
                />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          ) : showPayment ? (
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                Complete your payment of ₹19 to start your mentorship journey
              </p>
              <Button 
                className="w-full bg-primary text-primary-foreground"
                onClick={() => {
                  toast.success("Payment initiated");
                  // Here you would integrate your payment gateway
                }}
              >
                <IndianRupee className="w-4 h-4 mr-2" />
                Pay ₹19
              </Button>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className="py-8">
                <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">We are reaching you soon...</h3>
                <p className="text-muted-foreground">
                  Thank you for your interest! Our team will contact you shortly to discuss how we can help with your JEE preparation.
                </p>
              </div>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with current IIT students who recently cleared JEE and understand your challenges
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleGetStartedClick}
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
