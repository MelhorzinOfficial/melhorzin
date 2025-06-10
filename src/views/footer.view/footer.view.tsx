export function FooterView() {
  return (
    <footer>
      <div className="flex flex-col w-full content-box">
        <div className="flex items-center justify-center py-10 border-t">
          <p className="text-muted-foreground text-base">
            © {new Date().getFullYear()} Henrique Teixeira. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
