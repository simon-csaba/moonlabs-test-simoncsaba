import axios from "axios";

export const Register = ({formData, uploadCodeToServer}) => {
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const payload = {
            "email" : formData.email,
            "name" : e.target.name.value
        }

        axios.post("https:/ncp-dummy.staging.moonproject.io/api/simon-csaba/user/register", payload).then((res) => {
            uploadCodeToServer(formData);
        }).catch((err) => {
            console.log(err)
        })
    }

    return <form className="flex flex-col items-center bg-white border-black border-solid border-2" onSubmit={handleRegisterSubmit}>
        <label>Kérem regisztráljon!</label>
        <label htmlFor="email">Email cím</label>
        <input className="border-solid border-2 border-gray-400 w-4/6 text-center"  type="text" name="email" value={formData.email} readOnly></input>
        <label htmlFor="name">Név</label>
        <input className="border-solid border-2 border-gray-400 w-4/6 text-center mb-2"  type="text" name="name" required></input>
        <div>
            <input className="mr-2" type="checkbox" name="rules" required></input>
            <label htmlFor="rules">Elolvastam és elfogadom a játékszabályzatot.</label>
        </div>
        <button className="bg-gray-100 border-solid border-2 border-gray-300 rounded mt-3 w-2/6 p-1 mb-1" type="submit">Regisztráció</button>
    </form>
}