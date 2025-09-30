/**
     * Copyright © 2025 [ balxzzy ]
     *
     * All rights reserved. This source code is the property of [ Shiina Team ].
     * Unauthorized copying, distribution, modification, or use of this file,
     * via any medium, is strictly prohibited without prior written permission.
     *
     * This software is protected under international copyright laws.
     *
     * Contact: [ pa424013@gmail.com ]
     * GitHub: https://github.com/balxz
     * Official: https://balxzzy.web.id
     * Support: https://t.me/sh_team1
 */
const axios = require("axios")

function createClient(baseURL, headers = {}) {
	return axios.create({
		baseURL,
		validateStatus: () => true,
		headers
	})
}

function makeClient(instance) {
	let safeCall =
		(fn) =>
    		async (...args) => {
    			try {
    				let res = await fn(...args)
    				return res?.data
    			} catch (e) {
    				return e?.response?.data
    			}
    		}

	return {
		get: safeCall((path, params, options) =>
			instance.get(path, { params, ...options })
		),
		post: safeCall((path, data, options) =>
			instance.post(path, data, options)
		),
		request: safeCall((options) => instance.request({ ...options }))
	}
}

module.exports = (url, key = null) =>
	makeClient(
		createClient(url, {
			"x-api-key": key
		})
	)