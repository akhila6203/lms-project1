import { useState } from "react";
import { useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Plug,
  Mail,
  Smartphone,
  Globe,
  Trash2,
  Check,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useUICustomization } from "@/contexts/UICustomizationContext";
import { colorPresets } from "@/contexts/UICustomizationContext";
import { navColorPresets } from "@/contexts/UICustomizationContext";
import { fontPresets } from "@/contexts/UICustomizationContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";



/* ================= MAIN ================= */
export default function SettingsPage() {
 const sidebarItem =
  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition w-full justify-start " +
  "hover:bg-gray-100 " +
  "data-[state=active]:bg-primary data-[state=active]:text-white";

  return (
    <div className="space-y-6 mt-14">

      <Tabs defaultValue="profile" className="flex items-start">

  {/* 🔥 LEFT SIDEBAR */}
  <div className="w-[240px] pr-8 sticky top-18 pt-20 h-fit">

    <TabsList className="flex flex-col gap-2 bg-transparent p-0">

      <TabsTrigger value="profile" className={sidebarItem}>
        <User className="h-4 w-4" /> Profile
      </TabsTrigger>

      <TabsTrigger value="workspace" className={sidebarItem}>
        <Globe className="h-4 w-4" /> Workspace
      </TabsTrigger>

      <TabsTrigger value="notifications" className={sidebarItem}>
        <Bell className="h-4 w-4" /> Notifications
      </TabsTrigger>

      <TabsTrigger value="security" className={sidebarItem}>
        <Shield className="h-4 w-4" /> Security
      </TabsTrigger>

      <TabsTrigger value="appearance" className={sidebarItem}>
        <Palette className="h-4 w-4" /> Appearance
      </TabsTrigger>

      <TabsTrigger value="integrations" className={sidebarItem}>
        <Plug className="h-4 w-4" /> Integrations
      </TabsTrigger>

    </TabsList>

  </div>

  {/* 🔥 MIDDLE VERTICAL LINE */}
  <div className="w-px bg-gray-200 mx-4"></div>

  {/* 🔥 RIGHT CONTENT */}
  <div className="flex-1 pl-2">

    <p className="text-lg font-semibold ">
      Manage your workspace, profile and platform preferences.
    </p>

    <TabsContent value="profile"><ProfileSection /></TabsContent>
    <TabsContent value="workspace"><WorkspaceSection /></TabsContent>
    <TabsContent value="notifications"><NotificationsSection /></TabsContent>
    <TabsContent value="security"><SecuritySection /></TabsContent>
    <TabsContent value="appearance"><AppearanceSection /></TabsContent>
    <TabsContent value="integrations"><IntegrationsSection /></TabsContent>

  </div>

</Tabs>
      {/* <Tabs defaultValue="profile" className="space-y-6"> */}
          
        {/* <TabsList className="flex h-auto w-full flex-wrap gap-1 bg-muted/60 p-1">
          <TabsTrigger value="profile"><User className="h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="workspace"><Globe className="h-4 w-4" /> Workspace</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security"><Shield className="h-4 w-4" /> Security</TabsTrigger>
          <TabsTrigger value="appearance"><Palette className="h-4 w-4" /> Appearance</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-4 w-4" /> Billing</TabsTrigger>
          <TabsTrigger value="integrations"><Plug className="h-4 w-4" /> Integrations</TabsTrigger>
        </TabsList> */}

        {/* <TabsContent value="profile"><ProfileSection /></TabsContent>
        <TabsContent value="workspace"><WorkspaceSection /></TabsContent>
        <TabsContent value="notifications"><NotificationsSection /></TabsContent>
        <TabsContent value="security"><SecuritySection /></TabsContent>
        <TabsContent value="appearance"><AppearanceSection /></TabsContent>
        <TabsContent value="billing"><BillingSection /></TabsContent>
        <TabsContent value="integrations"><IntegrationsSection /></TabsContent> */}

      {/* </Tabs> */}
    </div>
  );
}

/* ================= COMMON CARD ================= */
function SectionCard({ title, description, children, footer }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="space-y-5">
        {children}
      </CardContent>

      {footer && (
        <div className="flex justify-end gap-2 border-t bg-muted/30 px-6 py-3">
          {footer}
        </div>
      )}
    </Card>
  );
}

/* ================= PROFILE ================= */
function ProfileSection() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@learnhub.com");
  const [bio, setBio] = useState(
    "Product-focused admin running the LearnHub workspace."
  );

  const [image, setImage] = useState(null);

  // 🔥 HANDLE IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // 🔥 REMOVE IMAGE
  const handleRemove = () => {
    setImage(null);
  };

  return (
    <SectionCard
      title="Profile information"
      description="This appears across the admin and on courses you publish."
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          {/* <Button onClick={() => toast.success("Profile updated")}>
            Save changes
          </Button> */}
          <Button
              onClick={() => {
                const profile = {
                  name,
                  email,
                  avatar: image
                };

                // localStorage.setItem("profile", JSON.stringify(profile));
                localStorage.setItem("admin_profile", JSON.stringify(profile));

                window.dispatchEvent(new Event("profileUpdated"));

                toast.success("Profile updated");
              }}
            > Save changes</Button>
        </>
      }
    >
      {/* 🔥 PROFILE IMAGE */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full overflow-hidden shadow-md">
          {image ? (
            <img
              src={image}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-semibold">
              {name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
        </div>

        {/* 🔥 BUTTONS */}
        <div className="flex gap-2">
          <label>
            <Button variant="outline" size="sm" asChild>
              <span>Upload new</span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <Button
            variant="ghost"
            size="sm"
            className="text-destructive"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </div>

      {/* 🔥 FORM */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Bio</Label>
        <Textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
    </SectionCard>
  );
}

/* ================= WORKSPACE ================= */
function WorkspaceSection() {
  return (
    <SectionCard
      title="Workspace"
      description="Brand and defaults applied across your platform."
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => toast.success("Workspace saved")}>
            Save changes
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">

        {/* Workspace Name */}
        <div className="grid gap-2">
          <Label htmlFor="ws-name">Workspace name</Label>
          <Input id="ws-name" defaultValue="LearnHub" />
        </div>

        {/* Domain */}
        <div className="grid gap-2">
          <Label htmlFor="ws-domain">Public URL</Label>
          <Input id="ws-domain" defaultValue="learnhub.app" />
        </div>

        {/* Language */}
        <div className="grid gap-2">
          <Label>Default language</Label>
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Timezone */}
        <div className="grid gap-2">
          <Label>Timezone</Label>
          <Select defaultValue="utc">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="pst">Pacific (PST)</SelectItem>
              <SelectItem value="est">Eastern (EST)</SelectItem>
              <SelectItem value="ist">India (IST)</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>
    </SectionCard>
  );
}

/* ================= NOTIFICATIONS ================= */
function NotificationsSection() {
  const rows = [
    {
      icon: Mail,
      title: "Email digests",
      desc: "Weekly summary of platform activity.",
      defaultOn: true,
    },
    {
      icon: Bell,
      title: "Course enrollments",
      desc: "Alert when a student joins a course.",
      defaultOn: true,
    },
    {
      icon: Smartphone,
      title: "Mobile push",
      desc: "Real-time pushes on the admin app.",
      defaultOn: false,
    },
    {
      icon: Sparkles,
      title: "Product updates",
      desc: "Hear about new LearnHub features.",
      defaultOn: true,
    },
  ];

  return (
    <SectionCard
      title="Notifications"
      description="Choose how you want to be notified about activity."
    >
      <div className="divide-y">
        {rows.map((r) => (
          <div
            key={r.title}
            className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
          >
            <div className="flex items-start gap-3">
              
              {/* ICON */}
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <r.icon className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* TEXT */}
              <div>
                <p className="text-sm font-medium">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>

            </div>

            {/* SWITCH */}
            <Switch defaultChecked={r.defaultOn} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
/* ================= SECURITY ================= */
function SecuritySection() {
  return (
    <div className="space-y-6">

      {/* PASSWORD */}
      <SectionCard
        title="Password"
        description="Use a strong, unique password to protect your account."
        footer={
          <Button onClick={() => toast.success("Password updated")}>
            Update password
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">

          <div className="grid gap-2">
            <Label>Current password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <div className="grid gap-2">
            <Label>New password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>

        </div>
      </SectionCard>

      {/* TWO FACTOR */}
      <SectionCard
        title="Two-factor authentication"
        description="Add a second layer of security with an authenticator app."
      >
        <div className="flex items-center justify-between">

          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <KeyRound className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Authenticator app</p>
              <p className="text-xs text-muted-foreground">
                Use Google Authenticator, 1Password or Authy.
              </p>
            </div>
          </div>

          <Badge variant="secondary" className="gap-1">
            <Check className="h-3 w-3" /> Enabled
          </Badge>

        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Active sessions</p>
            <p className="text-xs text-muted-foreground">
              2 devices currently signed in.
            </p>
          </div>

          <Button variant="outline" size="sm">
            Manage
          </Button>
        </div>
      </SectionCard>

      {/* DANGER ZONE */}
      <SectionCard
        title="Danger zone"
        description="Irreversible and destructive actions."
      >
        <div className="flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-medium">Delete workspace</p>
            <p className="text-xs text-muted-foreground">
              Permanently remove the workspace and all data.
            </p>
          </div>

          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4" /> Delete workspace
          </Button>

        </div>
      </SectionCard>

    </div>
  );
}

/* ================= APPEARANCE ================= */
function AppearanceSection() {
  
  const { isDark, toggle } = useTheme();
    const {
      colorPreset,
      fontPreset,
      borderRadius,
      navColorPreset,
      setColorPreset,
      setFontPreset,
      setBorderRadius,
      setNavColorPreset,
    } = useUICustomization();


  const borderRadiusPresets = [
    { id: "sm", name: "Small", value: "6px" },
    { id: "md", name: "Medium", value: "12px" },
    { id: "lg", name: "Large", value: "20px" },
  ];

  return (
    <div className="space-y-8">

  {/* THEME MODE */}
  <div>
    <h3 className="text-sm font-semibold text-foreground mb-3">
      Theme Mode
    </h3>

    <div className="flex gap-3">
      {[
        { label: "Light", active: !isDark },
        { label: "Dark", active: isDark },
      ].map((mode) => (
        <button
          key={mode.label}
          onClick={() => {
            if (mode.active) return;
            toggle();
          }}
          className={`flex-1 max-w-[160px] h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
            mode.active
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
          }`}
        >
          <div
            className={`w-8 h-5 rounded-md ${
              mode.label === "Light"
                ? "bg-white border border-border shadow-sm"
                : "bg-foreground"
            }`}
          />
          <span className="text-xs font-medium">{mode.label}</span>
        </button>
      ))}
    </div>
  </div>

  {/* COLOR PALETTE */}
  <div>
    <h3 className="text-sm font-semibold text-foreground mb-1">
      Color Palette
    </h3>

    <p className="text-xs text-muted-foreground mb-3">
      Choose a primary accent color
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {colorPresets.map((preset) => {
        const isActive = colorPreset === preset.id;

        return (
          <button
            key={preset.id}
            onClick={() => setColorPreset(preset.id)}
            className={`relative rounded-xl border-2 p-3 transition ${
              isActive
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/40"
            }`}
          >
            {isActive && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}

            <div className="flex gap-1 mb-2">
              {preset.preview.map((color, i) => (
                <div
                  key={i}
                  className="flex-1 h-6 rounded-md"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <span className="text-xs font-medium text-foreground">
              {preset.name}
            </span>
          </button>
        );
      })}
    </div>
  </div>

  {/* TYPOGRAPHY */}
  <div>
    <h3 className="text-sm font-semibold text-foreground mb-1">
      Typography
    </h3>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {fontPresets.map((preset) => {
        const isActive = fontPreset === preset.id;

        return (
          <button
            key={preset.id}
            onClick={() => setFontPreset(preset.id)}
            className={`relative rounded-xl border-2 p-4 text-left transition ${
              isActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
          >
            {isActive && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}

            <span
              className="block font-bold mb-1"
              style={{ fontFamily: `${preset.heading}, sans-serif` }}
            >
              {preset.heading}
            </span>

            <span className="text-xs text-muted-foreground">
              Body: {preset.body}
            </span>
          </button>
        );
      })}
    </div>
  </div>

  {/* BORDER RADIUS */}
  <div>
    <h3 className="text-sm font-semibold text-foreground mb-1">
      Border Radius
    </h3>

    <div className="flex gap-3 flex-wrap">
      {borderRadiusPresets.map((preset) => {
        const isActive = borderRadius === preset.id;

        return (
          <button
            key={preset.id}
            onClick={() => setBorderRadius(preset.id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 ${
              isActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
          >
            <div
              className="w-10 h-10 bg-primary/20 border"
              style={{ borderRadius: preset.value }}
            />
            <span className="text-xs">{preset.name}</span>
          </button>
        );
      })}
    </div>
  </div>

  {/* NAVIGATION BG */}
  <div>
    <h3 className="text-sm font-semibold text-foreground mb-1">
      Navigation Background
    </h3>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {navColorPresets.map((preset) => {
        const isActive = navColorPreset === preset.id;

        return (
          <button
            key={preset.id}
            onClick={() => setNavColorPreset(preset.id)}
            className={`relative rounded-xl border-2 p-3 ${
              isActive
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/40"
            }`}
          >
            {isActive && (
              <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
            )}

            <div
              className="w-full h-10 rounded-lg mb-2"
              style={{ backgroundColor: preset.preview }}
            />

            <span className="text-xs">{preset.name}</span>
          </button>
        );
      })}
    </div>
  </div>

</div>
  );
}

/* ================= BILLING ================= */
// function BillingSection() {
//   return (
//     <SectionCard title="Billing">
//       <Button onClick={() => toast.success("Billing saved")}>
//         Save
//       </Button>
//     </SectionCard>
//   );
// }

/* ================= INTEGRATIONS ================= */
function IntegrationsSection() {
  const integrations = [
    {
      name: "Slack",
      desc: "Get course updates in your channels.",
      connected: true,
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Zoom",
      desc: "Schedule live classes inside courses.",
      connected: true,
      color: "from-sky-500 to-cyan-400",
    },
    {
      name: "Stripe",
      desc: "Accept payments for paid courses.",
      connected: false,
      color: "from-indigo-500 to-blue-500",
    },
    {
      name: "Google Drive",
      desc: "Import learning materials directly.",
      connected: false,
      color: "from-emerald-500 to-teal-400",
    },
    {
      name: "Mailchimp",
      desc: "Sync students into marketing audiences.",
      connected: false,
      color: "from-amber-500 to-orange-400",
    },
    {
      name: "Webhooks",
      desc: "Send platform events to your endpoints.",
      connected: true,
      color: "from-pink-500 to-rose-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((i) => (
        <Card key={i.name} className="transition-all hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              
              {/* ICON BOX */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${i.color} text-white shadow-sm`}
              >
                <Plug className="h-5 w-5" />
              </div>

              {/* STATUS BADGE */}
              {i.connected ? (
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" /> Connected
                </Badge>
              ) : (
                <Badge variant="outline">Not connected</Badge>
              )}
            </div>

            {/* TITLE */}
            <p className="mt-4 font-medium">{i.name}</p>

            {/* DESCRIPTION */}
            <p className="mt-1 text-xs text-muted-foreground">
              {i.desc}
            </p>

            {/* BUTTON */}
            <div className="mt-4">
              <Button
                variant={i.connected ? "outline" : "default"}
                size="sm"
                className="w-full"
                onClick={() =>
                  toast.success(
                    i.connected
                      ? `${i.name} disconnected`
                      : `${i.name} connected`
                  )
                }
              >
                {i.connected ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

