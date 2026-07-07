export async function onRequestPost({ request }) {

    try {

        const body = await request.json();

        const username = body.username?.trim();

        const password = body.password;

        if (
            username === "adminms7" &&
            password === "MS7LUCKYMAN135512"
        ) {

            return Response.json({

                success: true,

                token: "trenzych-admin-session",

                message: "Login successful."

            });

        }

        return Response.json({

            success: false,

            message: "Invalid username or password."

        });

    } catch (err) {

        return Response.json({

            success: false,

            message: err.message

        });

    }

}
