<script>
    export let url = '/';
    export let displaysData = true;
    let base = 'https://vixeny.deno.dev';
    let response = '';
    let error = '';
    let isLoading = false;

    /**
     * Performs a fetch request to the specified URL with a timeout.
     * @param {RequestInfo | URL} url The URL to fetch.
     * @param {number} timeout Timeout in milliseconds before aborting the fetch.
     * @returns {Promise<Object>} A promise that resolves to the response object.
     */
    async function makeRequestWithTimeout( url) {
    
     

        try {
            const startTime = performance.now();
            const res = await fetch(url);
            const duration = performance.now() - startTime;
            const data = await res.text();
   
            const objResponse = {
                url,
                latency: `${(duration).toFixed(2)} ms`, 
                host: 'deno deploy (free tier)', 
                status: res.status,
            }


            objResponse.data = displaysData
                ? data
                : undefined

            return objResponse;
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch data');
        }
    }

    async function handleClick() {
        isLoading = true;
        response = '';
        error = '';

        try {
            const result = await makeRequestWithTimeout(base + url, 5000);
            response = JSON.stringify(result, null, 2); 
        } catch (err) {
            error = err.message;
        } finally {
            isLoading = false;
        }
    }
</script>

<style>
    .response, .error {
        margin-top: 1em;
        padding: 1em;
        border-radius: 4px;
        background-color: var(--closest);
    }
    button {
        padding: 10px 20px;
        font-size: 16px;
        color: white;
        background-color: var(--closer);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: background-color 0.3s, box-shadow 0.3s;
    }
    button:hover {
        background-color: #0056b3;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    button:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
    }
</style>

<br>

<button on:click={handleClick} disabled={isLoading}>
    {#if isLoading}
        Loading...
    {:else}
        Make request to :  <code>{url}</code>
    {/if}
</button>

{#if response}
    <pre class="response">{response}</pre>
{/if}

{#if error}
    <div class="error">{error}</div>
{/if}