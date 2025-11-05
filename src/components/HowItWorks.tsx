const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Register Your Cooperative",
      description: "Sign up and complete your cooperative profile with RCA certificate verification."
    },
    {
      number: "02",
      title: "Add Members & Products",
      description: "Import members via CSV and list your cooperative's products on the marketplace."
    },
    {
      number: "03",
      title: "Manage Operations",
      description: "Track finances, manage orders, and communicate with members through announcements."
    },
    {
      number: "04",
      title: "Grow & Scale",
      description: "Access analytics, generate reports, and expand your market reach with blockchain transparency."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Get started with Smart Cooperative Hub in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center space-y-4">
                <div className="inline-flex h-20 w-20 rounded-full bg-white/10 backdrop-blur items-center justify-center border-2 border-white/20">
                  <span className="text-3xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-primary-foreground/80">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-white/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
