"use client";

import { useState } from "react";
import Image from "next/image";
import { User as UserIcon, Edit2, Save, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import styles from "./ProfileHeader.module.css";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileHeaderProps {
    profile: Profile | null;
    user: User;
}

export default function ProfileHeader({ profile, user }: ProfileHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: profile?.username || "",
        display_name: profile?.display_name || "",
        bio: profile?.bio || "",
    });

    const supabase = createClient();

    const handleSave = async () => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    ...formData,
                    updated_at: new Date().toISOString(),
                });

            if (error) throw error;
            setIsEditing(false);
            window.location.reload(); // Simple reload to refresh server data
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.coverImage} />

            <div className={styles.content}>
                <div className={styles.avatarWrapper}>
                    {profile?.avatar_url ? (
                        <Image
                            src={profile.avatar_url}
                            alt={profile.display_name || "User"}
                            width={120}
                            height={120}
                            className={styles.avatar}
                        />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            <UserIcon size={60} />
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <div className={styles.formGroup}>
                                <label>Display Name</label>
                                <input
                                    value={formData.display_name}
                                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Username</label>
                                <input
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className={styles.textarea}
                                />
                            </div>
                            <div className={styles.actions}>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className={styles.saveBtn}
                                >
                                    <Save size={16} /> Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className={styles.cancelBtn}
                                >
                                    <X size={16} /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className={styles.name}>{profile?.display_name || "Anonymous User"}</h1>
                            <p className={styles.username}>@{profile?.username || "user"}</p>
                            <p className={styles.bio}>{profile?.bio || "No bio yet."}</p>

                            <div className={styles.stats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{profile?.contribution_count || 0}</span>
                                    <span className={styles.statLabel}>Contributions</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{profile?.badge || "Newbie"}</span>
                                    <span className={styles.statLabel}>Badge</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className={styles.editBtn}
                            >
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
