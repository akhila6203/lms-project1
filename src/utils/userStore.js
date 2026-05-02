const KEY_WISHLIST = "wishlist_courses";
const KEY_CART = "cart_courses";
const KEY_PROFILE = "user_profile";
const KEY_PROGRESS = "learning_progress";

export function getWishlist() {
  return JSON.parse(localStorage.getItem(KEY_WISHLIST)) || [];
}

export function toggleWishlist(courseId) {
  const current = getWishlist();
  const exists = current.includes(courseId);
  const next = exists ? current.filter((id) => id !== courseId) : [...current, courseId];
  localStorage.setItem(KEY_WISHLIST, JSON.stringify(next));
  return next;
}

export function isWishlisted(courseId) {
  return getWishlist().includes(courseId);
}

export function getCart() {
  return JSON.parse(localStorage.getItem(KEY_CART)) || [];
}

export function toggleCart(courseId) {
  const current = getCart();
  const exists = current.includes(courseId);
  const next = exists ? current.filter((id) => id !== courseId) : [...current, courseId];
  localStorage.setItem(KEY_CART, JSON.stringify(next));
  return next;
}

export function isInCart(courseId) {
  return getCart().includes(courseId);
}

export function getProfile() {
  return (
    JSON.parse(localStorage.getItem(KEY_PROFILE)) || {
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      avatar: "",
      expertise: "",
      company: "",
      role: "",
      linkedin: "",
      twitter: "",
      portfolio: "",
    }
  );
}

export function saveProfile(profile) {
  localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
}

export function getLearningProgress() {
  return JSON.parse(localStorage.getItem(KEY_PROGRESS)) || {};
}

export function saveLearningProgress(progress) {
  localStorage.setItem(KEY_PROGRESS, JSON.stringify(progress));
}

export function markLessonViewed(courseId, lessonTitle) {
  if (!courseId || !lessonTitle) return;
  const progress = getLearningProgress();
  const current = progress[courseId] || { lessons: [], materials: [], quizzes: [], updatedAt: null };
  if (!current.lessons.includes(lessonTitle)) current.lessons.push(lessonTitle);
  current.updatedAt = new Date().toISOString();
  progress[courseId] = current;
  saveLearningProgress(progress);
}

export function markMaterialOpened(courseId, materialTitle) {
  if (!courseId || !materialTitle) return;
  const progress = getLearningProgress();
  const current = progress[courseId] || { lessons: [], materials: [], quizzes: [], updatedAt: null };
  if (!current.materials.includes(materialTitle)) current.materials.push(materialTitle);
  current.updatedAt = new Date().toISOString();
  progress[courseId] = current;
  saveLearningProgress(progress);
}

export function markQuizCompleted(courseId, quizTitle) {
  if (!courseId || !quizTitle) return;
  const progress = getLearningProgress();
  const current = progress[courseId] || { lessons: [], materials: [], quizzes: [], updatedAt: null };
  if (!current.quizzes.includes(quizTitle)) current.quizzes.push(quizTitle);
  current.updatedAt = new Date().toISOString();
  progress[courseId] = current;
  saveLearningProgress(progress);
}

