import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_PROJECTS_LISTINGS } from "@/data/projects";
import { ProjectDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";

export interface PropertyCardProps {
    className?: string;
    data?: ProjectDataType;
    size?: "default" | "small";
}

const DEMO_DATA = DEMO_PROJECTS_LISTINGS[0];

const PropertyCard: FC<PropertyCardProps> = ({
        size = "default",
        className = "",
        data = DEMO_DATA,
    }) => {
const {
        name,
        status,
        price,
        incentives,
        address,
        href,
        like,
        developer,
        buildingType,
        unitsStories,
        bedrooms,
        sizeSqFt,
        estimatedCompletion,
        summary,
        street_name,
        city_name,
        province,
        developer_info,
        images,
        id,
} = data;

const renderSliderGallery = () => {
        return (
                <div className="relative w-full">
                        <GallerySlider
                                uniqueID={`PropertyCard_${id}`}
                                ratioClass="aspect-w-12 aspect-h-11"
                                galleryImgs={images.map(image => image.src)} // Convert 'Image' type to 'string' type
                                imageClass="rounded-lg"
                                href={href}
                        />
                        <BtnLikeIcon isLiked={data.like} className="absolute right-3 top-3 z-[1]" />
                        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
                </div>
        );
};

    const renderContent = () => {
        return (
            <div className={`p-4 space-y-3 ${size === "small" ? "space-y-2" : "space-y-3"}`}>
                {/* Display property name */}
                <h2 className={`font-semibold ${size === "default" ? "text-lg" : "text-md"}`}>
                    {name}
                </h2>
                
                {/* Display summary or other details as needed */}
                <p className="text-sm text-neutral-500">{summary}</p>
                
                {/* Additional details */}
                <ul className="text-sm">
                    <li>Developer: {developer}</li>
                    <li>Building Type: {buildingType}</li>
                    <li>Units/Stories: {unitsStories}</li>
                    <li>Bedrooms: {bedrooms}</li>
                    <li>Size: {sizeSqFt} SqFt</li>
                    <li>Estimated Completion: {estimatedCompletion}</li>
                    <li>Address: {address}</li>
                </ul>

                {/* Display price */}
                <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">{price}</span>
                    {/* Placeholder for StartRating - ensure you adapt or remove based on your project data */}
                    <StartRating reviewCount={10} point={5} /> {/* Example placeholder */}
                </div>

                {/* Link to property detail page */}
                <div className="text-center">
                    <Link href={href}>
                        <div className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            View Details
                        </div>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-PropertyCard ${className} bg-white shadow-lg rounded-lg overflow-hidden`}>
            {renderSliderGallery()}
            {renderContent()}
        </div>
    );
};

export default PropertyCard;