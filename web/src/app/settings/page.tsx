"use client";

import Button from "@/components/Button/Button";
import { signOut } from "./settingsActions";

export default function SettingsPage(): React.ReactElement {
  return <Button text="Sign Out" onClick={() => signOut()} />;
}
