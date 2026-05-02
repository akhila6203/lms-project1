// import { useMemo } from "react";
// import { catalog } from "@/lib/catalog";
// import { getWishlist } from "@/utils/userStore";
// import { CourseCard } from "@/pages/user/CourseCard";

// export default function WishlistPage() {
//   const list = useMemo(() => {
//     const ids = getWishlist();
//     return catalog.filter((c) => ids.includes(c.id));
//   }, []);

//   return (
//     <div className="space-y-6 px-6 py-3 md:px-10">
//       <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-black/5">
//         <p className="text-xs text-muted-foreground">Home / Wishlist</p>
//         <h1 className="mt-2 text-3xl font-semibold">My wishlist</h1>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {list.map((c) => (
//           <CourseCard key={c.id} course={c} />
//         ))}
//       </div>

//       {list.length === 0 && (
//         <div className="rounded-2xl bg-white p-8 text-center text-sm text-muted-foreground shadow-sm ring-1 ring-black/5">
//           Wishlist is empty. Add courses using the heart icon on course cards.
//         </div>
//       )}
//     </div>
//   );
// }

