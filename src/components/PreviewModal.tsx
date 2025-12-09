import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileItem {
  name: string;
  size: string;
}

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
  files: FileItem[];
}

const PreviewModal = ({ open, onOpenChange, onContinue, files }: PreviewModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">File Preview</h2>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Preview of files ready for download. Sign in to access full content.
          </p>

          <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  Preview
                </div>
              </div>
            ))}
          </div>

          <Button 
            onClick={onContinue}
            className="w-full bg-cta-blue hover:bg-cta-blue/90"
          >
            Continue to Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
