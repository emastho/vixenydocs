<script>
    import { onMount } from 'svelte';

    let showButton = false;
    let timeout;

    const handleScroll = () => {
        if (window.scrollY > 100) {
            showButton = true;
            resetTimeout();
        } else {
            showButton = false;
        }
    };

    const handleMouseMove = () => {
        if (showButton) {
            resetTimeout();
        }
    };

    const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            showButton = false;
        }, 2000);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    });
</script>

<style>
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--closest);
        color: white;
        border: none;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: opacity 0.3s;
        opacity: 0;
        pointer-events: none;
    }

    .scroll-to-top.show {
        opacity: 1;
        pointer-events: auto;
    }
</style>

<button
    class="scroll-to-top {showButton ? 'show' : ''}"
    on:click={scrollToTop}
>
    Top
</button>
