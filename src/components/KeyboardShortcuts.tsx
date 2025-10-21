import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcuts = [
    { key: "⌘ K", description: "Open command menu" },
    { key: "⌘ /", description: "Open chat" },
    { key: "⌘ D", description: "Go to dashboard" },
    { key: "⌘ A", description: "Go to analytics" },
    { key: "⌘ S", description: "Quick search" },
    { key: "ESC", description: "Close menu/modal" },
    { key: "↑ ↓", description: "Navigate items" },
    { key: "ENTER", description: "Select item" }
  ];

  return (
    <>
      {/* Hint badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-40"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 glass rounded-lg text-sm hover:scale-105 transition-transform"
        >
          <Command className="w-4 h-4" />
          <span>Press ⌘K</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <Card className="glass border-2 border-secondary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Command className="w-5 h-5 text-secondary" />
                    Keyboard Shortcuts
                  </CardTitle>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-accent rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {shortcuts.map((shortcut, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                      <kbd className="px-3 py-1 bg-muted rounded text-xs font-semibold border border-border">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardShortcuts;
