import { useState, useEffect } from 'react';

interface PreviewData {
  loading: boolean;
  error: boolean;
  imageUrl: string | null;
}

// Cache for preview URLs
const previewCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export function useWebsitePreview(url: string): PreviewData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Validate URL format and security
  const isValidUrl = (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (!url || !isValidUrl(url)) {
      setError(true);
      setLoading(false);
      return;
    }

    // Check cache first
    const cached = previewCache.get(url);
    const now = Date.now();
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      setImageUrl(cached.url);
      setLoading(false);
      return;
    }

    const generatePreview = async () => {
      try {
        setLoading(true);
        setError(false);

        // Try different screenshot services
        let previewUrl;
        
        if (process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY) {
          // Primary service: ScreenshotOne
          previewUrl = `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&access_key=${process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=jpg&quality=85&response_type=image&block_ads=true&block_trackers=true&block_requests=false&cache_ttl=2592000`;
        } else {
          // Fallback service: Microlink (no API key needed)
          previewUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
        }
        
        // Test if the image can be loaded
        const response = await fetch(previewUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch preview');
        }
        
        const data = await (process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY ? 
          Promise.resolve({ url: previewUrl }) : 
          response.json()
        );

        const finalImageUrl = process.env.NEXT_PUBLIC_SCREENSHOT_API_KEY ? 
          previewUrl : 
          data.screenshot.url;

        // Verify the image can be loaded
        const img = new Image();
        img.onload = () => {
          // Cache the successful result with timestamp
          previewCache.set(url, { url: finalImageUrl, timestamp: Date.now() });
          setImageUrl(finalImageUrl);
          setLoading(false);
        };
        img.onerror = () => {
          throw new Error('Failed to load preview image');
        };
        img.src = finalImageUrl;
      } catch (err) {
        console.error('Failed to generate preview:', err);
        setError(true);
        setLoading(false);
      }
    };

    // Add debounce to avoid too many requests
    const timeoutId = setTimeout(() => {
      generatePreview();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      setImageUrl(null);
      setLoading(true);
      setError(false);
    };
  }, [url]);

  return { loading, error, imageUrl };
}
