import { FileText, Link2 } from "lucide-react";

interface FileItem {
  name: string;
  size: string;
}

const files: FileItem[] = [
  { name: "Purchase Order.pdf", size: "1.5 MB" },
  { name: "Sample.docx", size: "450 KB" },
  { name: "Drawing.dwg", size: "2.3 MB" },
  { name: "Company Profile.pdf", size: "8.2 MB" },
  { name: "Invoice.pdf", size: "320 KB" },
];

const FileCard = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-slide-in-left opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
      <h2 className="text-lg font-semibold text-card-foreground mb-4">
        Your files are ready
      </h2>
      
      <div className="space-y-0 max-h-80 overflow-y-auto">
        {files.map((file, index) => (
          <div 
            key={index} 
            className="file-item"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {file.size}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Report a problem link */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground mt-4 mb-4 cursor-pointer hover:text-foreground transition-colors">
        <Link2 className="w-4 h-4" />
        <span className="text-sm">Report a problem</span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-cta-blue text-secondary-foreground py-3 rounded-full font-medium hover:bg-cta-blue/90 transition-colors">
          Download all
        </button>
        <button className="flex-1 border border-border text-card-foreground py-3 rounded-full font-medium hover:bg-muted transition-colors">
          Open preview
        </button>
      </div>
    </div>
  );
};

export default FileCard;
