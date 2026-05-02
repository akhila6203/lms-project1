import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Bell, Shield, User, Palette, LogOut,
  Heart, ShoppingCart, Trash2, X
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

import { catalog, getCourse } from "../../lib/catalog";
import { CourseCard } from "./CourseCard"; // adjust path
import { getCart, getWishlist } from "../../utils/userStore";
// import { getLearningProgress } from "../../utils/userStore";
import MyLearning from "./MyLearning";
import Footer from "../../pages/Footer";

export default function SettingsPage() {
  const navigate = useNavigate();

  // 👤 USER STATE (instead of auth)
  // const [user, setUser] = useState({
  //   name: "Akhila",
  //   email: "akhila@gmail.com",
  //   avatar: null,
  //   wishlist: [],
  //   cart: []
  // });
  const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("user_profile");
  return saved
    ? JSON.parse(saved)
    : {
        name: "Akhila",
        email: "akhila@gmail.com",
        avatar: null,
        wishlist: [],
        cart: []
      };
});

useEffect(() => {
  if (!user) return;

  localStorage.setItem("user_profile", JSON.stringify(user));

  window.dispatchEvent(new Event("profileUpdated"));
}, [user]);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
  const root = window.document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}, [theme]);

  const fileRef = useRef(null);


  const cartIds = getCart();
const cartItems = catalog.filter((c) => cartIds.includes(c.id));

const wishlistIds = getWishlist();
const wishlistItems = catalog.filter((c) => wishlistIds.includes(c.id));


  // ❤️ Toggle Wishlist
  const toggleWishlist = (id) => {
    setUser({
      ...user,
      wishlist: user.wishlist.includes(id)
        ? user.wishlist.filter(i => i !== id)
        : [...user.wishlist, id]
    });
  };

  // 🛒 Toggle Cart
  const toggleCart = (id) => {
    setUser({
      ...user,
      cart: user.cart.includes(id)
        ? user.cart.filter(i => i !== id)
        : [...user.cart, id]
    });
  };

  // const [activeTab, setActiveTab] = useState("profile");
  const location = useLocation();

const getTabFromURL = () => {
  const params = new URLSearchParams(location.search);
  return params.get("tab") || "profile";
};

const [activeTab, setActiveTab] = useState(getTabFromURL());

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");

  if (tab) {
    setActiveTab(tab);
  }
}, [location.search]);

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = (event) => {
    img.src = event.target.result;
  };

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const MAX_WIDTH = 200;

    const scale = MAX_WIDTH / img.width;
    canvas.width = MAX_WIDTH;
    canvas.height = img.height * scale;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const compressed = canvas.toDataURL("image/jpeg", 0.7);

    setUser({
      ...user,
      avatar: compressed,
    });
  };

  reader.readAsDataURL(file);
};

  return (
    <div>
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">

      <div className="w-full lg:w-[240px] space-y-2 flex lg:block overflow-x-auto lg:overflow-visible">
  {[
    { id: "profile", label: "Profile", icon: User },
    { id: "learning", label: "My Learning", icon: User },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    // { id: "cart", label: "Cart", icon: ShoppingCart },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ].map((item) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        // onClick={() => setActiveTab(item.id)}
        onClick={() => {
          setActiveTab(item.id);
          navigate(`/settings?tab=${item.id}`);
        }}
        className={`min-w-[140px] lg:w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap
          ${activeTab === item.id
            ? "bg-primary text-white"
            : "hover:bg-gray-100"
          }`}
      >
        <Icon className="h-4 w-4" />
        {item.label}
      </button>
    );
  })}
</div>   {/* ✅ CLOSE SIDEBAR HERE */}

      <div className="flex-1 space-y-4 sm:space-y-6">

         {activeTab === "profile" && (
      //  <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>How others see you</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">

             
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16">
                  {user.avatar && <AvatarImage src={user.avatar} />}
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                    {user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />

                  <div className="flex gap-2">
                    <Button onClick={() => fileRef.current?.click()}>
                      Change Photo
                    </Button>

                    {/* {user.avatar && (
                      <Button variant="ghost" onClick={() => setUser({ ...user, avatar: null })}>
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    )} */}
                    {user.avatar && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const updatedUser = { ...user, avatar: null };
                          setUser(updatedUser);
                        }}
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG. Max 2MB
                  </p>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                {/* <Button onClick={() => alert("Saved!")}>
                  Save Changes
                </Button> */}
                <Button
                  onClick={() => {
                    localStorage.setItem("user_profile", JSON.stringify(user));
                    window.dispatchEvent(new Event("profileUpdated"));
                    alert("Saved!");
                  }}
                >
                  Save Changes
                </Button>
              </div>

            </CardContent>
          </Card>
        // </TabsContent>
    )}

    {activeTab === "wishlist" && (
      // <TabsContent value="wishlist">
  <Card className="border-border/60">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Heart className="h-4 w-4 text-primary" /> My wishlist
      </CardTitle>
      <CardDescription>Courses you've saved for later.</CardDescription>
    </CardHeader>

    <CardContent>
      {wishlistItems.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">Wishlist is empty</p>

          <Button asChild className="mt-4">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </CardContent>
  </Card>
// </TabsContent>
    )}

    {/* {activeTab === "cart" && (
  <Card className="border-border/60">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ShoppingCart className="h-4 w-4 text-primary" /> My cart
      </CardTitle>
      <CardDescription>Courses ready to enroll.</CardDescription>
    </CardHeader>

    <CardContent>
      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">Cart is empty</p>

          <Button asChild className="mt-4">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cartItems.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </CardContent>
  </Card>
// </TabsContent>
    )} */}

    {activeTab === "appearance" && (
  <Card className="border-border/60">
    <CardHeader>
      <CardTitle>Appearance</CardTitle>
      <CardDescription>Pick how LearnHub looks to you.</CardDescription>
    </CardHeader>

    <CardContent>
      <div className="grid gap-3 sm:grid-cols-2">
        {["light", "dark"].map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`rounded-xl border p-4 text-left transition ${
              theme === t
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:bg-accent/40"
            }`}
          >
            <div
              className={`h-20 rounded-lg ${
                t === "light"
                  ? "bg-gradient-to-br from-white to-slate-100 border"
                  : "bg-gradient-to-br from-slate-800 to-slate-950"
              }`}
            />

            <p className="mt-3 text-sm font-medium capitalize">{t}</p>

            <p className="text-xs text-muted-foreground">
              {t === "light"
                ? "Bright and clean"
                : "Easy on the eyes"}
            </p>
          </button>
        ))}
      </div>
    </CardContent>
  </Card>
// </TabsContent>

    )}

    {activeTab === "notifications" && (
    //  <TabsContent value="notifications">
  <Card className="border-border/60">
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>Decide what you want to hear about.</CardDescription>
    </CardHeader>

    <CardContent className="divide-y divide-border/60 p-0">
      {[
        {
          t: "Course updates",
          d: "New lessons in courses you're enrolled in.",
        },
        {
          t: "Reminders",
          d: "Weekly nudges to keep your streak alive.",
        },
        {
          t: "Promotions",
          d: "Discounts and seasonal offers.",
        },
        {
          t: "Community",
          d: "Replies and mentions in discussions.",
        },
      ].map((row, i) => (
        <div
          key={row.t}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5"
        >
          <div>
            <p className="text-sm font-medium">{row.t}</p>
            <p className="text-xs text-muted-foreground">{row.d}</p>
          </div>

          <Switch defaultChecked={i < 2} />
        </div>
      ))}
    </CardContent>
  </Card>
// </TabsContent>

    )}

    {activeTab === "security" && (
      // <TabsContent value="security">
  <Card className="border-border/60">
    <CardHeader>
      <CardTitle>Security</CardTitle>
      <CardDescription>Keep your account safe.</CardDescription>
    </CardHeader>

    <CardContent className="space-y-5">
      
      {/* Password Fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>New password</Label>
          <Input type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-1.5">
          <Label>Confirm password</Label>
          <Input type="password" placeholder="••••••••" />
        </div>
      </div>

      <Separator />

      {/* Logout Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            Sign out from this device
          </p>
          <p className="text-xs text-muted-foreground">
            You'll need to sign in again next time.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate("/login")}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>

    </CardContent>
  </Card>
// </TabsContent>
    )}

    {/*  my learning page */}

      {activeTab === "learning" && (
        <MyLearning/>
      )}
      </div>
      </div>
      <Footer/>
      </div>
  );
}


