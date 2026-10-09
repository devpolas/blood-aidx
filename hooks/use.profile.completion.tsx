import {
  useCurrentUser,
  useMyDonorProfile,
  useMyLocation,
  useMyProfile,
} from "@/hooks";

export function useProfileCompletion() {
  const { data: userResponse, isPending: isUserLoading } = useCurrentUser();

  const { data: profileResponse, isPending: isProfileLoading } = useMyProfile();

  const { data: donorResponse, isPending: isDonorLoading } =
    useMyDonorProfile();

  const { data: locationResponse, isPending: isLocationLoading } =
    useMyLocation();

  const user = userResponse?.data?.user;
  const profile = profileResponse?.data?.profile;
  const donor = donorResponse?.data?.donor;
  const location = locationResponse?.data?.location;

  // Moderators and admins do not need profile setup.
  const requiresProfileSetup = user?.role === "user";

  const isPersonalComplete = Boolean(
    user?.name && user?.gender && profile?.phone && profile?.dateOfBirth,
  );

  const isDonorComplete = Boolean(donor?.bloodGroup && donor?.availability);

  const isLocationComplete = Boolean(
    location?.country &&
    location?.division &&
    location?.city &&
    location?.village &&
    location?.postalCode,
  );

  const isComplete =
    !requiresProfileSetup ||
    (isPersonalComplete && isDonorComplete && isLocationComplete);

  const completedSteps = [
    isPersonalComplete,
    isDonorComplete,
    isLocationComplete,
  ].filter(Boolean).length;

  const totalSteps = 3;

  const completionPercentage = requiresProfileSetup
    ? Math.round((completedSteps / totalSteps) * 100)
    : 100;

  const isLoading =
    isUserLoading ||
    (requiresProfileSetup &&
      (isProfileLoading || isDonorLoading || isLocationLoading));

  return {
    isComplete,
    requiresProfileSetup,
    isLoading,
    steps: {
      personal: isPersonalComplete,
      donor: isDonorComplete,
      location: isLocationComplete,
    },
    completedSteps,
    totalSteps,
    completionPercentage,
  };
}
