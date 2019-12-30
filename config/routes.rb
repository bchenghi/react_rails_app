Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    jsonapi_resources :categories
    jsonapi_resources :tasks
  end

  get "*path", to: "home#index", constraints: { format: "html" }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
