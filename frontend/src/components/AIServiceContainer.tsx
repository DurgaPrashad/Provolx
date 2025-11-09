import { Card, CardContent } from "@/components/ui/card";

interface AIServiceContainerProps {
  onTalkToAI: () => void;
}

const AIServiceContainer = ({ onTalkToAI }: AIServiceContainerProps) => {
  return (
    <Card className="glass border-2 border-secondary/20 rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div 
            className="loader cursor-pointer"
            style={{ transform: "scale(1.5)" }}
            onClick={onTalkToAI}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <mask id="clipping">
                  <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
                  <polygon points="25,25 75,25 50,75" fill="white"></polygon>
                  <polygon points="50,25 75,75 25,75" fill="white"></polygon>
                  <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                  <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                  <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                  <polygon points="35,35 65,35 50,65" fill="white"></polygon>
                </mask>
              </defs>
            </svg>
            <div className="box"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIServiceContainer;