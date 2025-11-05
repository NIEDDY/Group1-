import { Users, DollarSign, ShoppingBag, Shield, Bell, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Member Management",
      description: "Efficiently manage cooperative members with comprehensive profiles, invitation flows, and CSV import capabilities."
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Track income, expenses, contributions, and generate detailed financial reports with blockchain-anchored transparency."
    },
    {
      icon: ShoppingBag,
      title: "Marketplace Integration",
      description: "Connect with buyers through an integrated marketplace. List products, manage orders, and grow your sales."
    },
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Leverage blockchain technology for transparent, tamper-proof record keeping and enhanced trust."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay informed with real-time notifications via email, SMS, and in-app alerts for important updates."
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Access comprehensive reports and analytics for better decision-making and regulatory compliance."
    }
  ];

  return (
    <section id="features" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Powerful Features for Modern Cooperatives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to digitalize and grow your cooperative, all in one comprehensive platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
