import NavigateButton from "@/components/small/NavigateButton";

export default function Breeds() {
  return (
    <div className="mt-8">
      <NavigateButton href="/profile/breeds/new" icon="left">
        افزودن نژاد
      </NavigateButton>
    </div>
  );
}
