import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Settings, Palette, Globe, Database, Users, 
  CheckCircle, XCircle, Upload, Plus, Trash2 
} from "lucide-react";

const Admin = () => {
  const integrations = [
    { name: "Salesforce CRM", status: "connected", icon: Database, color: "text-success" },
    { name: "Zendesk Service Desk", status: "connected", icon: Settings, color: "text-success" },
    { name: "WhatsApp Business API", status: "setup-required", icon: Globe, color: "text-warning" }
  ];

  const languages = [
    "English", "Hindi", "German", "French", "Spanish", "Mandarin", 
    "Arabic", "Portuguese", "Russian", "Japanese"
  ];

  const team = [
    { name: "Sarah Johnson", email: "sarah.j@vw.com", role: "Admin", status: "Active" },
    { name: "Michael Chen", email: "michael.c@vw.com", role: "Agent", status: "Active" },
    { name: "Priya Sharma", email: "priya.s@vw.com", role: "Agent", status: "Active" },
    { name: "David Kumar", email: "david.k@vw.com", role: "Manager", status: "Active" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Settings</h1>
          <p className="text-muted-foreground mt-2">Configure platform settings and integrations</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="ai">AI Settings</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="VW SmartSupport" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Volkswagen Group" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option>Asia/Kolkata (IST)</option>
                    <option>Europe/Berlin (CET)</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Brand Colors
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2">
                        <Input id="primary-color" defaultValue="#001E50" className="flex-1" />
                        <div className="w-12 h-10 rounded border bg-[#001E50]"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2">
                        <Input id="accent-color" defaultValue="#00B0F0" className="flex-1" />
                        <div className="w-12 h-10 rounded border bg-[#00B0F0]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Logo Upload</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Tab */}
          <TabsContent value="integration">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration, i) => {
                  const Icon = integration.icon;
                  return (
                    <div key={i} className="flex items-center justify-between p-6 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <p className="font-semibold">{integration.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {integration.status === "connected" ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-success" />
                                <span className="text-sm text-success">Connected</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-warning" />
                                <span className="text-sm text-warning">Setup Required</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {integration.status === "connected" ? (
                          <>
                            <Button variant="outline" size="sm">Configure</Button>
                            <Button variant="outline" size="sm">Disconnect</Button>
                          </>
                        ) : (
                          <Button variant="default" size="sm">Connect</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings Tab */}
          <TabsContent value="ai">
            <div className="space-y-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>AI Confidence Threshold</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Minimum Confidence Level</Label>
                      <span className="text-sm font-semibold text-secondary">85%</span>
                    </div>
                    <Slider defaultValue={[85]} max={100} step={5} />
                    <p className="text-sm text-muted-foreground">
                      AI will only auto-respond if confidence is above this threshold
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Sentiment Escalation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-escalate negative sentiment</Label>
                      <p className="text-sm text-muted-foreground">Notify agents when sentiment drops</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Priority flag for urgent cases</Label>
                      <p className="text-sm text-muted-foreground">Mark conversations as urgent automatically</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Language Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {languages.map((lang) => (
                      <div key={lang} className="flex items-center gap-2">
                        <Switch defaultChecked={["English", "Hindi", "German"].includes(lang)} />
                        <Label>{lang}</Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Select languages for AI to support in conversations
                  </p>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Knowledge Base</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-semibold mb-1">Upload Knowledge Base Documents</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, TXT files supported</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">VW_Service_Manual_2024.pdf</span>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <span className="text-sm">Warranty_Terms.pdf</span>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button variant="default">Save AI Settings</Button>
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Management
                </CardTitle>
                <Button variant="default" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {team.map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary/10 text-secondary">
                            {member.role}
                          </span>
                          <p className="text-xs text-success mt-1">{member.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
