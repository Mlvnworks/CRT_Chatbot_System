export default async function (req, res) {
    if (req.method === 'POST') {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        };

        try {
            const sendQuery = await fetch(`http://localhost:5000/api/ai/ask`, options);
            const response = await sendQuery.json();

            if (response.err) {
                res.status(500).json(response);
            } else {
                res.status(200).json(response);
            }
        } catch (err) {
            res.status(500).json({
                err: true,
                errMsg: err.getMessage,
                data: null,
            });
        }
    } else {
        res.status(501).json({
            err: true,
            errMsg: 'Invalid request method!',
            data: null,
        });
    }
}
