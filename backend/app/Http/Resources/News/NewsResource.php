<?php

namespace App\Http\Resources\News;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {

        $resource = $this->resource;
        $isAllFail = $resource['isAllFail'];
        $news = $resource['news'];

        // If is all failed
        if ($isAllFail) {
            return [
                'isAllFail' => $isAllFail,
                'message' => "There is problem while fetching news from all sources!",
            ];
        }


        // Merge the all news from all sources
        $news = array_merge(...array_column($news, 'data'));

        // Set back to request
        $resource['news'] = $news;

        // Delete the non required data
        unset($resource['isAllFail']);

        // return
        return $resource;
        
    }
}
