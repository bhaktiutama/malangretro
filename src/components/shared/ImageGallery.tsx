import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    title: string;
    galleryClassName: string;
    mainImageClassName: string;
    sideImagesClassName?: string;
    sideImageClassName?: string;
}

export default function ImageGallery({
    images,
    title,
    galleryClassName,
    mainImageClassName,
    sideImagesClassName,
    sideImageClassName
}: ImageGalleryProps) {
    return (
        <div className={galleryClassName}>
            <div className={mainImageClassName}>
                <Image
                    src={images[0]}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
            </div>
            {images.length > 1 && sideImagesClassName && sideImageClassName && (
                <div className={sideImagesClassName}>
                    {images.slice(1, 3).map((img, idx) => (
                        <div key={idx} className={sideImageClassName} style={{ position: "relative" }}>
                            <Image
                                src={img}
                                alt={`${title} - Image ${idx + 2}`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
