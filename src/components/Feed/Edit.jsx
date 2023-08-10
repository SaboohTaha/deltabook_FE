import React from "react";
import FormFeed from "./Form";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EditFeed = () => {
    const [feed, setFeed] = useState({})
    const navigate = useNavigate()
    const params = useParams()
    const [media, setMedia] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const id = params.id
        const url = `http://127.0.0.1:3000/api/v1/feeds/${id}`
        axios.get(url)
            .then(resp => {
                setFeed(resp.data)
            })
            .catch(resp => console.log(resp))
    }, [])

    const handleChange = (e) => {
        e.preventDefault()
        setFeed(Object.assign({}, feed, { [e.target.name]: e.target.value }))
    }

    const handleMediaChange = (e) => {
        setMedia([...e.target.files])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const id = params.id
        const formData = new FormData()

        for (var key in feed) {
            formData.append(`feed[${key}]`, feed[key]);
        }
        formData.delete('feed[media]')
        media.forEach((item, index) => (
            formData.append('feed[media][]', item)
        ))

        const url = `http://127.0.0.1:3000/api/v1/feeds/${id}`
        axios.patch(url, formData, { headers: { "Content-Type": "multipart/form-data", } })
            .then(resp => {
                navigate(`/feeds/${resp.data.id}`)
            })
            .catch(resp => { console.log(resp) })
        setLoading(false)
    }

    const handleMediaDelete = (id) => {
        axios.delete(`http://127.0.0.1:3000/api/v1/feed_media/${id}/purge_later`)
            .then(resp => {
                console.log(resp)
                const newMedia = feed.media.filter(item => item.blob_id != resp.data.id)
                setFeed({
                    ...feed,
                    media: newMedia
                })
            })
            .catch(resp => { console.log(resp) })
    }

    return (
        <div className="container mx-auto w-fit">
            <h3 className="text-center text-white text-4xl my-4 font-semibold">Edit Feed</h3>
            <FormFeed
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleMedia={handleMediaChange}
                handleMediaDelete={handleMediaDelete}
                loading={loading}
                feed={feed}
            />
            <div className="text-center">
                <Link to={`/feeds`} className="border-2 rounded-lg h-12 px-4 py-2 border-neutral-600 bg-neural-600/[.20] transition duration-200 hover:bg-neutral-600 text-zinc-400 hover:text-white inline-block">Back to Feeds</Link>
            </div>
        </div>
    )
}

export default EditFeed;