import { useRouter } from "next/navigation";
import { type ILoginSubmitData } from "@/shared/lib/types";

export const useLogin = () => {
	const router = useRouter();

	function submitLogin(
		loginSubmitData: ILoginSubmitData,
	) {
		localStorage.setItem("userData", JSON.stringify(loginSubmitData));
		router.push("/");
	}
	
	return { submitLogin };
};

export const useRegistration = () => {
	const router = useRouter();

	function RegistrationSubmit(
		registrationSubmitData: ILoginSubmitData,
	) {
		localStorage.setItem("regUserData", JSON.stringify(registrationSubmitData));
		router.push("/auth/login");
	}

	return { RegistrationSubmit };
};
