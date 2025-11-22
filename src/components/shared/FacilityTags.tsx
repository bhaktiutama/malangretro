interface FacilityTagsProps {
    facilities: string[];
    containerClassName?: string;
    titleClassName?: string;
    tagsContainerClassName?: string;
    tagClassName: string;
}

export default function FacilityTags({
    facilities,
    containerClassName,
    titleClassName,
    tagsContainerClassName,
    tagClassName
}: FacilityTagsProps) {
    if (facilities.length === 0) {
        return null;
    }

    return (
        <div className={containerClassName}>
            <h4 className={titleClassName || ''} style={!titleClassName ? { fontFamily: "var(--font-bebas)", fontSize: "1.2rem", color: "var(--color-accent-brown)", marginBottom: "15px" } : undefined}>
                Facilities
            </h4>
            <div className={tagsContainerClassName || ''} style={!tagsContainerClassName ? { display: "flex", flexWrap: "wrap", gap: "10px" } : undefined}>
                {facilities.map((facility: string, idx: number) => (
                    <div key={idx} className={tagClassName}>
                        {facility}
                    </div>
                ))}
            </div>
        </div>
    );
}
