import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Download, Calendar } from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Analytics = () => {
  const kpis = [
    { label: "Total Conversations", value: "24,567", change: "+12%", trend: "up" },
    { label: "Avg Response Time", value: "2.8s", change: "-15%", trend: "up" },
    { label: "Resolution Rate", value: "71%", change: "+5%", trend: "up" },
    { label: "CSAT Score", value: "4.2/5", change: "0%", trend: "stable" }
  ];

  const conversationData = [
    { date: "1 Dec", conversations: 650 },
    { date: "5 Dec", conversations: 720 },
    { date: "10 Dec", conversations: 890 },
    { date: "15 Dec", conversations: 780 },
    { date: "20 Dec", conversations: 920 },
    { date: "25 Dec", conversations: 850 },
    { date: "30 Dec", conversations: 950 }
  ];

  const sentimentData = [
    { name: "Positive", value: 60, color: "hsl(var(--success))" },
    { name: "Neutral", value: 30, color: "hsl(var(--warning))" },
    { name: "Negative", value: 10, color: "hsl(var(--destructive))" }
  ];

  const issueCategories = [
    { category: "Service Booking", count: 850, percentage: 35 },
    { category: "Technical Query", count: 610, percentage: 25 },
    { category: "Billing", count: 365, percentage: 15 },
    { category: "Warranty", count: 295, percentage: 12 },
    { category: "Parts", count: 245, percentage: 10 },
    { category: "Other", count: 75, percentage: 3 }
  ];

  const agentPerformance = [
    { name: "Sarah Johnson", resolved: 156, rating: 4.8 },
    { name: "Michael Chen", resolved: 142, rating: 4.7 },
    { name: "Priya Sharma", resolved: 138, rating: 4.6 },
    { name: "David Kumar", resolved: 129, rating: 4.5 },
    { name: "Lisa Anderson", resolved: 121, rating: 4.4 }
  ];

  const peakHours = [
    [0, 1, 2, 3, 4, 5],
    [10, 15, 20, 18, 12, 8],
    [25, 30, 35, 40, 38, 32],
    [45, 50, 48, 42, 38, 35],
    [55, 60, 58, 52, 48, 42],
    [30, 35, 32, 28, 25, 22],
    [15, 18, 16, 14, 12, 10]
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['00-04', '04-08', '08-12', '12-16', '16-20', '20-24'];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">Comprehensive insights and performance metrics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 Days
            </Button>
            <Button variant="default" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi, i) => (
            <Card key={i} className="glass hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-success" />
                  ) : kpi.trend === "down" ? (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  ) : null}
                </div>
                <div className="text-3xl font-bold mb-2">{kpi.value}</div>
                <div className={`text-sm font-semibold ${
                  kpi.change.startsWith('+') ? 'text-success' :
                  kpi.change.startsWith('-') && kpi.trend === 'up' ? 'text-success' :
                  kpi.change === '0%' ? 'text-muted-foreground' :
                  'text-destructive'
                }`}>
                  {kpi.change} vs last week
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Conversation Volume */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Conversation Volume (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={conversationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Issue Categories */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Top Issue Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={issueCategories} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Peak Hours Heatmap */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Peak Hours Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2 mb-2">
                  <div className="w-20"></div>
                  {hours.map((hour) => (
                    <div key={hour} className="flex-1 text-center text-xs text-muted-foreground">
                      {hour}
                    </div>
                  ))}
                </div>
                {days.map((day, dayIndex) => (
                  <div key={day} className="flex gap-2">
                    <div className="w-20 text-sm font-medium flex items-center">{day}</div>
                    {peakHours[dayIndex].map((value, hourIndex) => (
                      <div
                        key={hourIndex}
                        className="flex-1 aspect-square rounded flex items-center justify-center text-xs font-semibold"
                        style={{
                          backgroundColor: `hsl(var(--secondary) / ${value / 60})`,
                          color: value > 30 ? 'white' : 'hsl(var(--foreground))'
                        }}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <div className="w-4 h-4 rounded bg-secondary/20"></div>
                  <span>Low</span>
                  <div className="w-16 h-2 rounded bg-gradient-to-r from-secondary/20 to-secondary"></div>
                  <span>High</span>
                  <div className="w-4 h-4 rounded bg-secondary"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Performance */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Agent Performance Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentPerformance.map((agent, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                      #{i + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.resolved} tickets resolved</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{agent.rating}</p>
                      <p className="text-xs text-muted-foreground">Avg Rating</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <div
                          key={starIndex}
                          className={`w-4 h-4 ${
                            starIndex < Math.floor(agent.rating)
                              ? 'text-warning'
                              : 'text-muted'
                          }`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
