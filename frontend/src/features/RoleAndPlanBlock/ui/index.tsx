import { capitalized } from "@/shared/lib";
import s from "./RoleAndPlanBlock.module.scss";
import { useUsersStore } from "@/shared/stores/users";

export default function RoleAndPlanBlock() {
    const { currentUser } = useUsersStore();
    const { role, plan } = currentUser!;
    return (
        <p className={s.roleInfo}>
            {capitalized(role.toString())} ་{" "}
            {capitalized(plan.toString()) + " plan"}
        </p>
    );
}