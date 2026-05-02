import { Link, useLocation } from "react-router-dom";
import { Star, Clock, BookOpen, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCart,
  getWishlist,
  toggleCart,
  toggleWishlist,
} from "@/utils/userStore";

export function CourseCard({ course }) {
  const location = useLocation();
  const from = `${location.pathname}${location.search}`;
  const [wishlisted, setWishlisted] = useState(getWishlist().includes(course.id));
  const [inCart, setInCart] = useState(getCart().includes(course.id));
  
  console.log("COURSE DATA:", course);

  return (
    <Card className="h-full overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link to={`/courses/${course.id}`} state={{ from }} className="block group">
        <div className="relative h-36 overflow-hidden">
            {/* IMAGE OR GRADIENT */}
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt="course"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${course.cover}`} />
            )}
            
            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/10" />

            {/* TAG */}
            {course.tag && (
              <Badge className="absolute left-3 top-3 bg-background/95 text-foreground hover:bg-background">
                {course.tag}
              </Badge>
            )}
            
            {/* LEVEL */}
            <Badge
              variant="secondary"
              className="absolute right-3 top-3 bg-background/90"
            >
              {course.level}
            </Badge>

          </div>
        {/* <div className={`relative h-36 bg-gradient-to-br ${course.cover}`}>
          <div className="absolute inset-0 bg-black/10" />
          {course.tag && (
            <Badge className="absolute left-3 top-3 bg-background/95 text-foreground hover:bg-background">
              {course.tag}
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="absolute right-3 top-3 bg-background/90"
          >
            {course.level}
          </Badge>
        </div> */}
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground">
            {course.category}
          </p>

          <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-primary transition">
            {course.title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {course.description}
          </p>

          <p className="text-xs text-muted-foreground">
            {/* By {course.instructor} */}
            <p className="text-xs text-muted-foreground">
  By {course.instructor || "Unknown"}
</p>
          </p>

          {/* RATING */}
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-medium">
              {/* {course.rating} */}
              {course.rating || 0}
            </span>
            <span className="text-xs text-muted-foreground">
              {/* ({course.reviews.toLocaleString()}) */}
              <span className="text-xs text-muted-foreground">
                ({(course.reviews || 0).toLocaleString()})
              </span>
            </span>
          </div>

          {/* META */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {/* {course.hours}h */}
              {course.hours || 0}h
            </span>

            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              {/* {course.lessons} lessons */}
              {course.lessons || 0} lessons
            </span>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-2 border-t px-4 py-3">
        <Button
          type="button"
          variant={wishlisted ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => {
            toggleWishlist(course.id);
            setWishlisted(getWishlist().includes(course.id));
          }}
        >
          <Heart className={`mr-1 h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
          {wishlisted ? "Wishlisted" : "Wishlist"}
        </Button>

        <Button
          type="button"
          variant={inCart ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => {
            toggleCart(course.id);
            setInCart(getCart().includes(course.id));
          }}
        >
          <ShoppingCart className={`mr-1 h-4 w-4 ${inCart ? "fill-current" : ""}`} />
          {inCart ? "Added" : "Add cart"}
        </Button>
      </div>
    </Card>
  );
}