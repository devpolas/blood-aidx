import { MapPinIcon } from "lucide-react";

import type { Location } from "@/types/location";
import { Separator } from "@/components/ui/separator";

import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { Paragraph } from "@/components/typography/typography";

interface LocationInformationProps {
  location?: Location;
}

export function LocationInformation({ location }: LocationInformationProps) {
  return (
    <ProfileSection
      icon={MapPinIcon}
      title='Location'
      description='Your registered location.'
      contentClassName='space-y-5 p-5 sm:p-6'
    >
      <div className='gap-5 sm:gap-6 grid sm:grid-cols-2'>
        <ProfileInfoItem
          icon={MapPinIcon}
          label='Country'
          value={location?.country || "—"}
        />

        <ProfileInfoItem
          icon={MapPinIcon}
          label='Division'
          value={location?.division || "—"}
        />

        <ProfileInfoItem
          icon={MapPinIcon}
          label='District'
          value={location?.district || "—"}
        />

        <ProfileInfoItem
          icon={MapPinIcon}
          label='City'
          value={location?.city || "—"}
        />

        <ProfileInfoItem
          icon={MapPinIcon}
          label='Village'
          value={location?.village || "—"}
        />

        <ProfileInfoItem
          icon={MapPinIcon}
          label='Postal Code'
          value={location?.postalCode || "—"}
        />
      </div>

      {location?.addressLine && (
        <>
          <Separator />

          <div className='min-w-0'>
            <ProfileInfoItem
              icon={MapPinIcon}
              label='Address'
              value={
                <Paragraph className='mt-0 warp-break-words'>
                  {location.addressLine}
                </Paragraph>
              }
            />
          </div>
        </>
      )}
    </ProfileSection>
  );
}
