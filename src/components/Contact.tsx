import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="container mx-auto px-4 font-sans">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tight drop-shadow-sm">
            Get In Touch
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-semibold">
            Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-primary to-primary/80 text-white hover:shadow-primary/25">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="inline-flex h-14 w-14 rounded-full bg-white/20 items-center justify-center mx-auto backdrop-blur-sm">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-wide">Email</h3>
              <p className="text-white/85 font-light text-base">info@smartcoophub.rw</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-secondary to-secondary/80 text-white hover:shadow-secondary/25">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="inline-flex h-14 w-14 rounded-full bg-white/20 items-center justify-center mx-auto backdrop-blur-sm">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-wide">Phone</h3>
              <p className="text-white/85 font-light text-base">+250 XXX XXX XXX</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-primary/60 to-secondary/60 text-white hover:shadow-primary/25">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="inline-flex h-14 w-14 rounded-full bg-white/20 items-center justify-center mx-auto backdrop-blur-sm">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-wide">Location</h3>
              <p className="text-white/85 font-light text-base">Kigali, Rwanda</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto mt-10 md:mt-14 shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-md rounded-2xl">
          <CardContent className="pt-8 px-6 md:px-10">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center gap-2 tracking-wide">
                    <Mail className="h-4 w-4 text-primary" />
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                    className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 border-gray-300 hover:border-primary/60 text-gray-800 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2 tracking-wide">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 border-gray-300 hover:border-primary/60 text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-gray-700 flex items-center gap-2 tracking-wide">
                  <Mail className="h-4 w-4 text-secondary" />
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help?"
                  required
                  className="focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300 border-gray-300 hover:border-secondary/60 text-gray-800 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700 flex items-center gap-2 tracking-wide">
                  <Mail className="h-4 w-4 text-primary" />
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={4}
                  required
                  className="focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 border-gray-300 hover:border-primary/60 text-gray-800 font-medium"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary via-primary/80 to-secondary hover:from-primary/90 hover:via-primary/70 hover:to-secondary/90 text-white font-semibold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl rounded-xl"
                size="lg"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
