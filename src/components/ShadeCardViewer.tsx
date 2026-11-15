import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist';
import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

GlobalWorkerOptions.workerSrc = '';
(globalThis as typeof globalThis & { pdfjsWorker?: { WorkerMessageHandler: unknown } }).pdfjsWorker = {
  WorkerMessageHandler: pdfWorker.WorkerMessageHandler,
};

type ShadeCardViewerProps = {
  src: string;
  name: string;
};

const ShadeCardViewer: React.FC<ShadeCardViewerProps> = ({ src, name }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const loadingTaskRef = useRef<ReturnType<typeof getDocument> | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setPage(1);
    setPageCount(0);
    setError('');
    setReady(false);

    const task = getDocument({ url: src });
    loadingTaskRef.current = task;
    task.promise
      .then((pdf) => {
        if (cancelled) return;
        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
      })
      .catch(() => {
        if (!cancelled) setError('This shade card could not be opened.');
      });

    return () => {
      cancelled = true;
      const current = loadingTaskRef.current;
      loadingTaskRef.current = null;
      pdfRef.current = null;
      try {
        const pending = current?.destroy();
        if (pending && typeof pending.then === 'function') pending.catch(() => {});
      } catch {
        // Closing one card must not take the rest of the page down.
      }
    };
  }, [src]);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const pdf = pdfRef.current;
    if (!stage || !canvas || !pdf || pageCount === 0) return;

    let cancelled = false;
    let renderTask: { cancel: () => void; promise: Promise<void> } | null = null;
    let renderGen = 0;
    let lastSize = '';

    const draw = async () => {
      const gen = ++renderGen;
      renderTask?.cancel();

      const pdfPage = await pdf.getPage(page);
      if (cancelled || gen !== renderGen) return;

      const box = stage.getBoundingClientRect();
      if (box.width < 40 || box.height < 40) return;

      const base = pdfPage.getViewport({ scale: 1 });
      const scale = Math.min((box.width - 24) / base.width, (box.height - 24) / base.height);
      const viewport = pdfPage.getViewport({ scale: Math.max(scale, 0.1) });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(viewport.width * pixelRatio);
      canvas.height = Math.floor(viewport.height * pixelRatio);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const task = pdfPage.render({
        canvas,
        viewport,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
      renderTask = task;
      try {
        await task.promise;
        if (!cancelled && gen === renderGen) setReady(true);
      } catch {
        // A newer render replaces this one when the page or size changes.
      }
    };

    draw();
    const observer = new ResizeObserver(() => {
      const box = stage.getBoundingClientRect();
      const key = `${Math.round(box.width)}x${Math.round(box.height)}`;
      if (key === lastSize) return;
      lastSize = key;
      draw();
    });
    observer.observe(stage);

    return () => {
      cancelled = true;
      renderTask?.cancel();
      observer.disconnect();
    };
  }, [page, pageCount]);

  return (
    <div className="mt-3">
      <div
        ref={stageRef}
        className="relative flex h-[calc(100svh-22rem)] min-h-[240px] max-h-[560px] items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white/40 shadow-inner backdrop-blur-md"
      >
        {error ? (
          <p className="px-4 text-center text-sm text-red-600">{error}</p>
        ) : (
          <>
            {!ready && <p className="absolute text-sm text-blue-900/70">Opening shade card…</p>}
            <canvas
              ref={canvasRef}
              aria-label={`${name}, page ${page}`}
              className={`bg-white shadow-sm ${ready ? '' : 'opacity-0'}`}
            />
          </>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 rounded-lg border border-white/80 bg-white/70 px-3 py-1.5 font-medium text-gray-800 shadow-sm backdrop-blur disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <span className="text-gray-600">
          Page {pageCount === 0 ? '–' : page} of {pageCount || '–'}
        </span>
        <button
          type="button"
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={pageCount === 0 || page >= pageCount}
          className="inline-flex items-center gap-1 rounded-lg border border-white/80 bg-white/70 px-3 py-1.5 font-medium text-gray-800 shadow-sm backdrop-blur disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
        <a
          href={src}
          download
          className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1.5 font-medium text-white shadow-md shadow-blue-900/20 hover:from-blue-700 hover:to-blue-900"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default ShadeCardViewer;
