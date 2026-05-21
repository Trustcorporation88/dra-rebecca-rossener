import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Procedimentos from "./pages/Procedimentos";
import ProcedimentoDetalhe from "./pages/ProcedimentoDetalhe";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Galeria from "./pages/Galeria";
import Depoimentos from "./pages/Depoimentos";
import Contato from "./pages/Contato";
import Agendamento from "./pages/Agendamento";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import AssistenteVirtual from "./components/AssistenteVirtual";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/procedimentos" component={Procedimentos} />
      <Route path="/procedimentos/:slug" component={ProcedimentoDetalhe} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/faq" component={FAQ} />
      <Route path="/galeria" component={Galeria} />
      <Route path="/depoimentos" component={Depoimentos} />
      <Route path="/contato" component={Contato} />
      <Route path="/agendamento" component={Agendamento} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Navbar />
          <Router />
          <Footer />
          <WhatsAppFloat />
          <AssistenteVirtual />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
