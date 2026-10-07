/* Configuração pública. A chave "anon" é pública por desenho: quem protege os dados é o RLS/RPC do Supabase.
   NUNCA coloque service_role ou senhas aqui. Telefones: fonte única para o site inteiro. */
const CFG={
  url:'https://vbzxmliwayxczxarwtgh.supabase.co',
  key:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZienhtbGl3YXl4Y3p4YXJ3dGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MTQ4NTYsImV4cCI6MjEwNjM5MDg1Nn0.3IbBrl1IrHgVR_krvlMVCogJI3ZIoU1WHwe8i1T4cdI',
  logo:'/logo-honda.png',   // opcional: arquivo ao lado do index.html
  video:'',                 // vídeo padrão (opcional); o normal é enviar pelo painel
  grupo:'GRUPO', star:'Star', resto:'Motos',
  contatos:{
    recepcao:{fone:'+55 68 8403-1001', tel:'+556884031001'},   // Recepção Técnica (agendamentos)
    seguros:{fone:'+55 68 9937-4863', tel:'+556899374863'}     // Setor de Seguros (cotações)
  }
};
