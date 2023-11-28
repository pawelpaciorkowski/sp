import React, { useState } from 'react';

const FAQ: React.FC<{ }> = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Najczęściej zadawane pytania</h2>
      <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Pierwsze kroki w aplikacji?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet. Qui quia voluptas qui laboriosam expedita et placeat quia eos nihil tenetur ab officiis fuga. Id corrupti officiis a voluptatum rerum non tempora voluptate vel labore molestiae. Eos rerum sapiente qui expedita molestias ea quia nisi ad natus quia ut temporibus mollitia sit voluptas deserunt aut fugit repellendus? Rem quas dolor ea corrupti eveniet ea dolores voluptas ex error tenetur est quos dolorem est soluta sequi et dolores omnis.</p>
              </div>
              <div className="mb-10">                        
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Do czego słyży aplikacja "ALAB FLOW"?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Eos voluptas perspiciatis aut assumenda adipisci id rerum exercitationem non molestiae soluta qui deserunt sunt.</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Co zorbić w przypadku braku działania aplikacji?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Qui facere repellat At excepturi voluptas eos numquam rerum et minima beatae sed ratione corrupti aut veritatis pariatur quo velit sint. Aut vitae repellat ea molestiae pariatur qui dolor delectus in illum provident qui veniam tempora.</p>
                  <p className="text-gray-500 dark:text-gray-400">Możesz <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline" target="_blank" rel="noreferrer">skontaktować się z nami</a> a zrobimy wszystko, aby rozwiązać problem</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Masz jakieś wskazówki jak poprawić działanie aplikacji?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Możesz napisać wiadomość do <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">naszych administratorów aplikacji</a></p>
                  <p className="text-gray-500 dark:text-gray-400">Aby znaleźć więcej informacji, zapoznaj się z <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">licencja </a>.</p>
              </div>
          </div>
          <div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Et cupiditate quia Quis qui odio eligendi et veniam sunt. ?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Non mollitia voluptatem aut dicta quidem qui dolore quisquam aut pariatur aspernatur ab molestiae similique.<a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">roadmap</a> tId aperiam distinctio et voluptatibus consequatur hic delectus minima ut numquam laborum qui temporibus magnam sit repudiandae fuga aut cumque rerum. </p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Lorem ipsum  et ipsam modi est quia earum. ?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">The <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">free version</a> Cum aspernatur doloribus est impedit nemo sit incidunt maxime ut molestiae officia qui voluptatem necessitatibus sit iste accusantium. Qui adipisci exercitationem 33 impedit sint vel alias quia qui nihil omnis</p>
                  <p className="text-gray-500 dark:text-gray-400">Vel nulla quia quo nesciunt esse in impedit voluptate et inventore galisum ut autem fugit. Quo consequuntur distinctio vel galisum voluptatem .</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Qui omnis earum  qui doloribus sint et veniam consequatur?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Sed libero iusto At velit itaque sed eaque rerum et necessitatibus enim qui alias suscipit aut omnis rerum.</p>
                  <p className="text-gray-500 dark:text-gray-400">Quo consequuntur voluptatem qui perferendis quos ut animi pariatur eos voluptate commodi in adipisci quia qui quidem recusandae!</p>
              </div>
              <div className="mb-10">
                  <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                      <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
                      Ut consequatur molestiae et  deserunt sed eius facilis?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Et ratione Quis et molestiae sunt aut molestiae quibusdam ab sunt laboriosam et libero quia ea consequatur asperiores. </p>
                  <p className="text-gray-500 dark:text-gray-400">Eum reprehenderit beatae vel cupiditate odit et perspiciatis possimus ut ipsum placeat aut suscipit expedita sed eius ipsum.</p>
                  <p className="text-gray-500 dark:text-gray-400">Eum perspiciatis possimus ut ipsum placeat aut suscipit expedita sed eius ipsum. <a href="#" className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline">yu pamal. license</a>.</p>
              </div>
          </div>
      </div>
  </div>
</section>
  );
};

export default FAQ;
