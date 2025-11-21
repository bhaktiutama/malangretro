import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import UserPosts from "@/components/profile/UserPosts";
import { getProfile } from "@/lib/api/profiles";
import { getPosts } from "@/lib/api/posts";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const profile = await getProfile(user.id);
    const userPosts = await getPosts({ userId: user.id });

    return (
        <main>
            <Navbar />
            <div style={{ paddingTop: "var(--header-height)", minHeight: "100vh", background: "var(--color-background)" }}>
                <ProfileHeader profile={profile} user={user} />
                <UserPosts posts={userPosts} />
            </div>
            <Footer />
        </main>
    );
}
