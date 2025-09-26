import { tick } from 'svelte';

export interface Paper {
  extractedID: string;
  title: string;
  pdfLink: string;
  likeCount?: number;
  commentCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

class PDFPreviewState {
	pdfLink = $state('');
	isOpen = $state(false);
	currentScale = $state(1.0);
	paper: Paper | null = $state(null);

	async openPaper(paper: Paper) {
		this.paper = paper;
		this.openPDF(paper.pdfLink);
	}

	async openPDF(pdfLink: string) {
		pdfPreviewState.closePDF();
		await tick();
		this.pdfLink = pdfLink;
		this.isOpen = true;
	}

	async closePDF() {
		this.pdfLink = '';
		this.isOpen = false;
	}

	async changeScale(scale: number, pdf: string) {
		pdfPreviewState.closePDF();
		this.currentScale = scale;
		await tick();
		this.openPDF(pdf);
	}
}

export const pdfPreviewState = new PDFPreviewState();
