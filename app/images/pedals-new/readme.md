# Adding new pedals

1. Add the cropped PNG into this folder

   * `app/images/pedals-new`

2. Run `gulp` task `process-new-pedal-images`

    ```
    npm run gulp process-new-pedal-images
    ```

Each PNG (`*.png`) will be processed:

* source file added to `app/images/pedals`
* optimised file added to `app/public/pedals`