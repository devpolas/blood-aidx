"use client";

import { useState } from "react";
import { MapPinIcon } from "lucide-react";
import type { Location } from "@/types/location";
import { Separator } from "@/components/ui/separator";
import { Paragraph } from "@/components/typography/typography";
import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection, ProfileEditButton } from "./profile-section";
import { EditLocationDialog } from "./dialogs/edit-location-dialog";

interface LocationInformationProps {
  location?: Location;
}

export function LocationInformation({ location }: LocationInformationProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfileSection
        icon={MapPinIcon}
        title='Location'
        description='Your registered location.'
        action={<ProfileEditButton onClick={() => setOpen(true)} />}
        className='lg:col-span-2'
        contentClassName='space-y-5 p-5 sm:p-6'
      >
        <div className='gap-5 sm:gap-6 grid sm:grid-cols-2 lg:grid-cols-3'>
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

        <Separator />

        <div className='min-w-0'>
          <ProfileInfoItem
            icon={MapPinIcon}
            label='Address'
            value={
              <Paragraph className='wrap-break-words'>
                {location?.addressLine || "No address added yet."}
              </Paragraph>
            }
          />
        </div>
      </ProfileSection>

      <EditLocationDialog
        location={location}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
