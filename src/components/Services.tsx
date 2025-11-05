import { Building2, ShoppingCart, Wallet, FileText } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Cooperative Registration",
      description: "Seamless onboarding process with RCA integration and certificate verification for legitimate cooperatives."
    },
    {
      icon: ShoppingCart,
      title: "Digital Marketplace",
      description: "Access a wide network of buyers, showcase your products, and manage orders with built-in payment processing."
    },
    {
      icon: Wallet,
      title: "Paypack Integration",
      description: "Secure mobile money and bank transactions with MTN, Airtel, and bank coverage through Paypack integration."
    },
    {
      icon: FileText,
      title: "Regulatory Compliance",
      description: "Automated reporting tools for RCA compliance with transparent, blockchain-anchored financial records."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions designed to meet the unique needs of Rwandan cooperatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex h-16 w-16 rounded-full bg-primary/10 items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
